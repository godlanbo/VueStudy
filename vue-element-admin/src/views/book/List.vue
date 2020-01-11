<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="书名"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="listQuery.author"
        placeholder="作者"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-select
        v-model="listQuery.category"
        placeholder="分类"
        clearable
        class="filter-item"
        @change="handleFilter"
      >
        <el-option :value="1">1</el-option>
        <el-option :value="2">2</el-option>
        <el-option :value="3">3</el-option>
        <el-option
          v-for="item in categoryList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >新增</el-button>
      <el-checkbox
        v-model="showCover"
        class="filter-item"
        style="margin-left: 5px"
        @change="handleShowCover"
      >显示封面</el-checkbox>
    </div>
    <el-table />
    <pagination
      :total="0"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination/index'
import waves from '@/directive/waves/waves'
import { getCategory } from '@/api/book'
export default {
  name: 'List',
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      listQuery: {

      },
      showCover: false,
      categoryList: []
    }
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    getCategoryList() {
      getCategory().then(response => {
        this.categoryList = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleFilter() {
      console.log(this.listQuery)
    },
    handleCreate() {
      this.$router.push('/book/create')
    },
    handleShowCover(value) {
      this.showCover = value
    }
  }
}
</script>
<style lang="scss" scope>

</style>
