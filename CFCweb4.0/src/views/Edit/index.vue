<template>
  <div class="edit-container">
    <sticky :class-name='"sub-navbar"'>
      <el-button
        type="success"
        :disabled="!shouldSave"
        @click="submitForm"
      >提交修改</el-button>
    </sticky>
    <component
      ref="edit"
      :is="currentComponent"
      :shouldSave="shouldSave"
      @change="handleChange"
      @successUpdate="onUpdateSuccess" />
  </div>
</template>
<script>
import Sticky from '@/components/Sticky'
import EditHome from './editHome'
import EditTeam from './editTeam'
import EditTimebase from './editTimebase'
export default {
  name: 'Edit',
  components: {
    Sticky,
    EditHome,
    EditTeam,
    EditTimebase
  },
  data() {
    return {
      shouldSave: false
    }
  },
  computed: {
    currentComponent() {
      return this.$route.name
    }
  },
  methods: {
    handleChange() {
      this.shouldSave = true
    },
    onUpdateSuccess() {
      this.$notify({
        type: 'success',
        message: '提交修改成功',
        title: '成功'
      })
    },
    submitForm() {
      this.shouldSave = false
      this.$refs.edit.update()
    }
  },
  beforeRouteLeave (to, from, next) {
    const path = from.path.split('/')[2]
    if (path === 'edit' && this.shouldSave) {
      this.$confirm('我们不会保留你在本页的任何改动，确认离开？', '提示', {
        confirmButtonText: '确定离开',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        next()
      }).catch(() => {
        next(false)
      })
    } else {
      next()
    }
  }
}
</script>
<style lang="scss" scoped>
.edit-container {
  position: relative;
  
}
</style>
<style lang="scss">
.sub-navbar {
  z-index: 2 !important;
  height: 60px;
  line-height: 60px;
  position: sticky;
  top: 0;
  width: 100%;
  text-align: right;
  padding-right: 60px;
  transition: 600ms ease position;
  background: linear-gradient(90deg, rgba(32, 182, 249, 1) 0%, rgba(32, 182, 249, 1) 0%, rgba(33, 120, 241, 1) 100%, rgba(33, 120, 241, 1) 100%);
}
</style>