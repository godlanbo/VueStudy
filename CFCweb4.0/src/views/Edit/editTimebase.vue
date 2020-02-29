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
        @delete-all="handleDeleteAll"
        @add-detail="handleAddDetail"
      ></timebase-item>
    </div>
    <div class="timebase-tool-wrapper">
      <el-date-picker
        v-model="newYearItem"
        type="year"
        format="yyyy 年"
        value-format="yyyy"
        placeholder="选择年">
      </el-date-picker>
      <el-button
        v-waves
        style="margin-left: 10px;"
        type="success"
        icon="el-icon-folder-add"
        @click="handleAddItem(0)"
      >在头部添加新的年份</el-button>
      <el-button
        v-waves
        type="success"
        icon="el-icon-folder-add"
        @click="handleAddItem(-1)"
      >在末尾添加新的年份</el-button>
    </div>
    <el-dialog
      title="事件信息编辑"
      :visible.sync="editDialogVisiable"
      width="40%"
    >
      <div class="dialog-content">
        <div class="content-left-wrapper">
          <div class="img-wrapper">
            <img style="width: 100%" :src="imgUrlData">
          </div>
          <div class="img-tool-wrapper">
            <div class="upload-wrapper">
              <el-upload
                class="upload-component"
                :action="action"
                :on-remove="onRemove"
                :limit="1"
                :on-success="onSuccess"
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
              <div class="img-url-input">
                <span>填入图源地址:</span>
                <el-input
                  :disabled="fileList.length !== 0"
                  v-model="imgUrlData"
                  placeholder="图源地址"></el-input>
              </div>
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
              <el-form-item label="日期" prop="title">
                <el-input
                  v-model="postForm.title"
                  placeholder="填入日期"></el-input>
                <!-- <el-date-picker
                  v-model="postForm.title"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 M 月 dd 日"
                  value-format="yyyy.M.dd">
                </el-date-picker>
                {{postForm.title}} -->
              </el-form-item>
              <el-form-item label="详情">
                <el-input
                  type="textarea"
                  resize="none"
                  :rows="9"
                  placeholder="填入事件详情"
                  v-model="postForm.content"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <template v-slot:footer class="dialog-footer">
        <el-button type="primary" @click="saveEdit">确 定</el-button>
        <el-button @click="editDialogVisiable = false">取 消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import waves from '@/components/waves/waves'
import TimebaseItem from './components/ContentItem'
import { getRole, removeImg, updateTimebase } from '@/api/admin'
import { getTimeBaseData } from '@/api/timebase'
import { getToken } from '@/utils/auth'
export default {
  name: 'EditTimebase',
  components: {
    TimebaseItem
  },
  directives: {
    waves
  },
  props: {
    shouldSave: Boolean
  },
  data() {
    return {
      itemInfo: [],
      newYearItem: '',
      imgUrlData: '',
      editIndex: null,
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
  watch: {
    itemInfo: {
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
    }
  },
  methods: {
    update() {
      const res = {
        timebaseInfo: this.itemInfo
      }
      updateTimebase(res).then(() => {
        this.$emit('success-update')
      }).catch(err => {
        this.$emit('error-update', err)
      })
    },
    handleAddItem(addIndex) {
      if (!this.newYearItem) {
        this.$message({
          type: 'warning',
          message: '请先选择年份'
        })
        return
      }
      const newItem = {
        title: parseInt(this.newYearItem),
        detailInfo: []
      }
      if (addIndex === -1) {
        this.itemInfo.push(newItem)
      } else {
        this.itemInfo.splice(0, 0, newItem)
      }
    },
    handleDeleteAll(itemIndex) {
      this.$confirm('是否删这一年事件？如果之后反悔，可以选择不提交修改刷新页面或者离开再回来', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.itemInfo.splice(itemIndex, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleAddDetail(itemIndex, detailIndex) {
      this.fileList = []
      this.editIndex = {
        itemIndex,
        detailIndex
      }
      this.postForm = {}
      this.imgUrlData = ''
      this.editDialogVisiable = true
    },
    saveEdit() {
      this.postForm.imgUrl = this.imgUrlData
      const { itemIndex, detailIndex } = this.editIndex
      if (detailIndex !== -1) {
        this.itemInfo[itemIndex].detailInfo.splice(detailIndex, 1, this.postForm)
      } else {
        this.itemInfo[itemIndex].detailInfo.push(this.postForm)
      }
      this.editDialogVisiable = false
    },
    handleEditDetail(itemIndex, detailIndex) {
      this.fileList = []
      // console.log(itemIndex, detailIndex)
      const editItem = this.itemInfo[itemIndex]
      this.editIndex = {
        itemIndex,
        detailIndex
      }
      this.postForm = Object.assign({}, editItem.detailInfo[detailIndex])
      this.imgUrlData = this.postForm.imgUrl
      this.editDialogVisiable = true
    },
    handleDeleteDetail(itemIndex, detailIndex) {
      this.$confirm('是否删除此事件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.itemInfo[itemIndex].detailInfo.splice(detailIndex, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    beforeUpload(file) {
      // this.uploadData.activeIndex = this.activeIndex
      const fileType = file.type
      const fileSize = file.size
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
      if (fileSize / 1024 /1024 > 6) {
        this.$message({
          type: 'warning',
          message: '图片过大，请手动压缩后上传'
        })
        return false
      }
    },
    onSuccess(response, file) {
      const data = response.data
      this.imgUrlData = `${process.env.VUE_APP_RES_URL}/timebaseImg/${data.fileName}`
      this.fileList.push(file)
    },
    onExceed() {
      this.$message({
        type: 'warning',
        message: '只能上传一张图片'
      })
    },
    onRemove() {
      const res = {
        fileName: this.imgUrlData
      }
      this.imgUrlData = this.postForm.imgUrl
      removeImg(res).then(() => {
        // console.log(response)
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
      })
      this.fileList = []
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
      padding-top: 0;
    }
    /deep/ .el-dialog__footer {
      padding-right: 30px;
    }
    .dialog-content {
      display: flex;
      align-items: flex-end;
      .content-left-wrapper {
        vertical-align: bottom;
        width: 45%;
        .upload-wrapper {
          .upload-component {
            height: 72px;
          }
        }
        .img-tool-wrapper {
          .img-url-input {
            span {
              line-height: 40px;
              vertical-align: middle;
              font: {
                size: 14px;
                weight: 700;
              }
            }
          }
        }
      }
      .content-right-wrapper {
        vertical-align: bottom;
        padding-left: 20px;
        // padding-right: 10px;
        width: 55%;
        .dialog-form-wrapper {
          position: relative;
          // top: -25px;
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
  .timebase-tool-wrapper {
    text-align: center;
    margin: 100px 0;
  }
}
</style>