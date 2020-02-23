<template>
  <div class="editTeam-container">
    <div class="table-wrapper">
      <el-table
        :data="tableInfo"
        stripe
        height="490"
      >
        <el-table-column
          prop="name"
          label="姓名"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="workCompany"
          label="工作单位"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="workCity"
          label="工作城市"
          align="center"
        >
        </el-table-column>
        <el-table-column
          align="right">
          <template v-slot:header>
            <el-input
              v-model="search"
              placeholder="输入关键字搜索"/>
            <!-- <el-button
              type="primary"
              style="margin-left: 10px"
              @click="handleSearchInfo"
            >搜索</el-button> -->
          </template>
          <template v-slot="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tool-wrapper">
      <el-button type="primary" @click="handleAdditem">新 增</el-button>
    </div>
    <el-dialog
      title="人物信息编辑"
      :visible.sync="editDialogVisiable"
      @open="handleDialogOpen"
      width="30%"
    >
      <div class="dialog-content-wrapper">
        <el-form
          :model="postForm"
          :rules="rules"
          hide-required-asterisk
          ref="postForm"
          label-suffix=":"
          label-width="80px"
          label-position="top"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="postForm.name"
              placeholder="填入姓名" />
          </el-form-item>
          <el-form-item label="工作单位" prop="workCompany">
            <el-input
              v-model="postForm.workCompany"
              placeholder="填入工作单位" />
          </el-form-item>
          <el-form-item label="工作城市" prop="workCity">
            <el-select v-model="postForm.workCity" filterable placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template v-slot:footer class="dialog-footer">
        <el-button type="primary" @click="saveEdit">确 定</el-button>
        <el-button @click="editDialogVisiable = false">取 消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { getAdminTeamData, updateTeam } from '@/api/admin'
export default {
  name: 'EditTeam',
  data() {
    return {
      search: '',
      editDialogVisiable: false,
      teamInfo: [],
      tableInfo: [],
      searchIndexMap: [],
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        workCompany: { required: true, message: '请输入工作单位', trigger: 'blur' },
        workCity: { required: true, message: '请输入工作城市', trigger: 'blur' }
      },
      editIndex: 0,
      postForm: {
        name: '',
        workCompany: '',
        workCity: ''
      },
      options: []
    }
  },
  watch: {
    teamInfo: {
      handler(newValue, oldValue) {
        // watch由于后续检测的是同一个数组，导致返回的newValue和oldValue是一样的
        // 不能如预期那样检测oldValue长度来触发change事件，否则会出现删除最后一个
        // 图片的时候无法触发change事件，这时可以用newValue和oldValue长度是否一致
        // 来判断是否是第一次进入，第一次进入时前后studioInfo指向不同的数组，返回的
        // 长度不一致，不会触发change事件
        if (oldValue.length === newValue.length) {
          this.$emit('change')
        }
      },
      deep: true
    },
    search: {
      handler(newValue) {
        this.searchIndexMap = []
        if (!newValue) {
          this.tableInfo = this.teamInfo
        } else {
          this.tableInfo = this.getTableData()
        }
      },
      immediate: true
    }
  },
  methods: {
    update() {
      const res = {
        teamInfo: this.teamInfo
      }
      updateTeam(res).then(() => {
        this.$emit('success-update')
      }).catch(err => {
        this.$emit('error-update', err)
      })
    },
    getTableData() {
      if (!this.search) {
        return this.teamInfo
      } else {
        let tableData = this.teamInfo.filter((item, index) => {
          if (item.name.includes(this.search) || item.workCompany.includes(this.search) || item.workCity.includes(this.search)) {
            this.searchIndexMap.push(index)
            return true
          }
        })
        return tableData
      }
    },
    handleDialogOpen() {
      this.$nextTick(() => {
        this.$refs.postForm.resetFields()
      })
    },
    saveEdit() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          if (this.editIndex !== -1) {
            this.teamInfo.splice(this.editIndex, 1, this.postForm)
          } else {
            this.teamInfo.push(this.postForm)
          }
          this.tableInfo = this.getTableData()
          this.editDialogVisiable = false
        } else {
          return false
        }
      })
    },
    handleAdditem() {
      this.postForm = {
        name: '',
        workCompany: '',
        workCity: ''
      }
      this.editIndex = -1
      this.editDialogVisiable = true
    },
    handleEdit(index, row) {
      if (this.searchIndexMap.length === 0) {
        this.editIndex = index
      } else {
        this.editIndex = this.searchIndexMap[index]
      }
      this.postForm = Object.assign({}, row)
      this.editDialogVisiable = true
    },
    handleDelete(index) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let delIndex = this.searchIndexMap.length === 0 ? index : this.searchIndexMap[index]
        this.teamInfo.splice(delIndex, 1)
        this.tableInfo = this.getTableData()
        this.$message({
          type: 'success',
          message: '已成功删除'
        })
      }).catch(() => {
        let delIndex = this.searchIndexMap.length === 0 ? index : this.searchIndexMap[index]
        console.log(delIndex)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    allCitys() {
      return [
        "河北", "山西", "吉林", "辽宁", "黑龙江", "陕西", "甘肃", "青海", 
        "山东", "福建", "浙江", "河南", "湖北", "湖南", "江西", "江苏", "安徽", 
        "广东", "海南", "四川", "贵州", "云南", "台湾", "北京", "上海", "天津", "重庆", 
        "内蒙古", "新疆", "宁夏", "广西", "西藏", "香港", "澳门"
      ]
    }
  },
  mounted() {
    this.options = this.allCitys()
  },
  created() {
    getAdminTeamData().then(response => {
      const data = response.data.data
      this.teamInfo = data.teamInfo
      this.tableInfo = this.teamInfo
    }).catch(err => {
      this.$message({
        type: 'error',
        message: err.message
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.editTeam-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-items: flex-end;
  .tool-wrapper {
    position: relative;
    margin: 20px auto;
    width: 90%;
    .el-button {
      float: right;
    }
  }
  .table-wrapper {
    position: relative;
    width: 90%;
    margin: 0 auto;
    margin-top: 25px;
  }
  .el-dialog__wrapper {
    /deep/ .el-dialog__body {
      padding-top: 0;
      padding-bottom: 0;
    }
    /deep/ .el-form-item__label {
      padding-bottom: 0;
    }
    .dialog-content-wrapper {
      width: 80%;
      margin: 0 auto;
    }
  }
}
</style>