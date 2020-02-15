<template>
  <div class="editTimebase-container">
    <div class="timebase-content-wrapper">
      <timebase-item
        v-for="(item, index) in itemInfo"
        :key="item.title"
        :itemInfo="item"
        :itemIndex="index"
        @edit-detail="handleEditDetail"
        @delete-detail="handleDeleteDetail"
      ></timebase-item>
    </div>
    <el-dialog
      title="事件信息编辑"
      :visible.sync="editDialogVisiable"
      width="40%"
    >
      <div class="dialog-content">
        <div class="content-left-wrapper">
          <div class="img-wrapper">
            <img style="width: 100%" :src="postForm.imgUrl">
          </div>
          <div class="img-tool-wrapper">
            <div class="upload-wrapper">
              <el-upload
                :action="action"
                :on-remove="onRemove"
                :limit="1"
                :before-upload="beforeUpload"
                :data="uploadData"
                :on-exceed="onExceed"
                :headers="header"
                :file-list="fileList"
              >
                <el-button
                  class="upload-btn"
                  type="primary"
                  icon="el-icon-upload"
                  size="medium"
                >上传图片</el-button>
              </el-upload>
            </div>
          </div>
        </div>
        <div class="content-right-wrapper">
          <div class="dialog-form-wrapper">
            <el-form
              :model="postForm"
              ref="form"
              label-suffix=":"
              label-width="80px"
              label-position="top"
            >
              <el-form-item label="日期">
                <el-input v-model="postForm.title"></el-input>
              </el-form-item>
              <el-form-item label="详情">
                <el-input type="textarea" resize="none" :rows="4" v-model="postForm.content"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <template v-slot:footer class="dialog-footer">
        <el-button type="primary" @click="editDialogVisiable = false">确 定</el-button>
        <el-button @click="editDialogVisiable = false">取 消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import TimebaseItem from './components/ContentItem'
import { getRole } from '@/api/admin'
import { getTimeBaseData } from '@/api/timebase'
import { getToken } from '@/utils/auth'
export default {
  name: 'EditTimebase',
  components: {
    TimebaseItem
  },
  props: {
    shouldSave: Boolean
  },
  data() {
    return {
      itemInfo: [],
      fileList: [],
      uploadData: {
        destination: 'timebaseImg'
      },
      action: `${process.env.VUE_APP_BASE_URL}/api/uploadImg`,
      imgDataUrl: '',
      postForm: {
        title: '',
        content: ''
      },
      editDialogVisiable: false
    }
  },
  computed: {
    header() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    handleEditDetail(itemIndex, detailIndex) {
      this.fileList = []
      console.log(itemIndex, detailIndex)
      this.postForm = Object.assign({}, this.itemInfo[itemIndex].detailInfo[detailIndex])
      this.editDialogVisiable = true
    },
    handleDeleteDetail(itemIndex, detailIndex) {
      console.log(itemIndex, detailIndex)
    },
    beforeUpload(file) {
      // this.uploadData.activeIndex = this.activeIndex
      const fileType = file.type
      if (!getToken()) {
        getRole().then(() => {}).catch(() => {})
        return false
      }
      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        this.$message({
          type: 'warning',
          message: '请上传png或者jp(e)g格式的图片'
        })
        return false
      }
    },
    onExceed() {
      this.$message({
        type: 'warning',
        message: '只能上传一张图片'
      })
    },
    onRemove() {
      console.log('remove')
    }
  },
  created() {
    getTimeBaseData().then(response => {
      const data = response.data.data
      this.itemInfo = data
    }).catch(err => {
      console.log(err)
      this.$message({
        type: 'error',
        message: err.message
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.editTimebase-container {
  position: relative;
  .el-dialog__wrapper {
    /deep/ .el-dialog__body {
      padding-bottom: 0;
    }
    /deep/ .el-dialog__footer {
      padding-right: 30px;
    }
    .dialog-content {
      display: flex;
      .content-left-wrapper {
        width: 45%;
        
      }
      .content-right-wrapper {
        padding-left: 10px;
        padding-right: 10px;
        width: 55%;
        .dialog-form-wrapper {
          position: relative;
          top: -25px;
          .el-form-item {
            margin-bottom: 0;
            /deep/ .el-form-item__label {
              padding-bottom: 0;
            }
            /deep/ .el-textarea__inner, /deep/ .el-input__inner {
              font-family: Arial, Helvetica, sans-serif;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>