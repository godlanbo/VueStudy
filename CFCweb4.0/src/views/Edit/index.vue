<template>
  <div class="edit-container">
    <sticky :class-name='"sub-navbar"'>
      <el-button
        type="success"
        @click="submitForm"
      >提交修改</el-button>
    </sticky>
    <component :is="currentComponent"></component>
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
  computed: {
    currentComponent() {
      return this.$route.name
    }
  },
  methods: {
    submitForm() {
      console.log('success')
      this.$notify({
        type: 'success',
        message: '提交修改成功',
        title: '成功'
      })
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
  padding-right: 20px;
  transition: 600ms ease position;
  background: linear-gradient(90deg, rgba(32, 182, 249, 1) 0%, rgba(32, 182, 249, 1) 0%, rgba(33, 120, 241, 1) 100%, rgba(33, 120, 241, 1) 100%);
}
</style>