<template>
  <div class="upload-container">
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="false"
      :limit="1"
      :before-uplaod="beforeUpload"
      :on-success="onSuccess"
      :on-error="onError"
      :on-remove="onRemove"
      :file-list="fileList"
      :on-exceed="onExceed"
      :disabled="disabled"
      show-file-list
      accept="application/epub+zip"
      class="image-upload"
      drag
    >
      <i class="el-icon-upload" />
      <div v-if="fileList.length === 0" class="el-upload__text">
        请将电子书拖入或 <em>点击上传</em>
      </div>
      <div v-else class="el-upload__text">图书已上传</div>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      action: `${process.env.VUE_APP_BASE_API}/book/upload`
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    beforeUpload(file) {
      console.log(file)
      // 注册父组件事件
      this.$emit('beforeUpload', file)
    },
    onRemove() {
      this.$message({
        message: '电子书删除成功',
        type: 'success'
      })
      this.$emit('onRemove')
    },
    onError(err) {
      const errMsg = err.message && JSON.parse(err.message)
      this.$message({
        message: (errMsg.message && `上传失败：${errMsg.message}`) || '上传失败',
        type: 'error'
      })
      // 注册父组件捕获错误事件
      this.$emit('onError', err)
    },
    onExceed() {
      this.$message({
        message: '每次只能上传一本电子书',
        type: 'warning'
      })
    },
    onSuccess(response, file) {
      const { code, message, data } = response
      if (code === 0) {
        this.$message({
          message: message,
          type: 'success'
        })
        this.$emit('onSuccess', data)
      } else {
        this.$message({
          message: message || '上传失败',
          type: 'error'
        })
        this.$emit('onError', file)
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
