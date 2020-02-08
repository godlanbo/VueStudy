<template>
  <div class="editHome-container">
    <el-divider content-position="left">History</el-divider>
    <div class="history-edit-content">
      <div class="content-left-wrapper">
        <detail-swiper
          ref="mySwiper"
          :historyInfo="historyInfo"
          @onSlideChange="onSlideChange" />
      </div>
      <div class="content-right-wrapper">
        <div class="upload-wrapper">
          <el-upload
            :action="active"
            :headers="header"
            :multiple="false"
            :limit="1"
            :file-list="fileList"
            :on-exceed="onExceed"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :on-remove="onRemove"
            show-file-list
            drag
          >
            <i class="el-icon-upload" />
            <div v-if="fileList.length === 0" class="el-upload__text">
              请将图片拖入或 <em>点击上传</em>
            </div>
            <div v-else class="el-upload__text">图片已上传</div>
          </el-upload>
        </div>
        <div class="form-wrapper">
          <el-form
            ref="form"
            label-suffix=":"
            :model="postForm"
            label-width="80px"
            label-position="top"
          >
            <el-form-item label="标题">
              <el-input v-model="postForm.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input type="textarea" resize="none" :rows="5" v-model="postForm.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 30%;"
                type="danger"
                v-waves
                @click="handleDeleteHistory">删除</el-button>
              <el-button
                style="width: 30%; margin-left: 40%;"
                type="primary"
                v-waves
                @click="handleNewHistory">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div style="height: 800px"></div>
  </div>
</template>
<script>
import DetailSwiper from './components/DetailSwiper'
import waves from '@/components/waves/waves'
import { getAdminHomeData, getRole, removeImg, updateHome } from '@/api/admin'
import { getToken } from '@/utils/auth'
// import Sticky from '@/components/Sticky'
export default {
  name: 'EditHome',
  components: {
    DetailSwiper
    // Sticky
  },
  directives: {
    waves
  },
  props: {
    isSave: Boolean,
    shouldSave: Boolean
  },
  data() {
    return {
      active: `${process.env.VUE_APP_BASE_URL}/api/uploadImg`,
      fileList: [],
      activeIndex: 0,
      postForm: {
        title: '',
        description: ''
      },
      tempImgUrlArr: [],
      historyInfo: []
    }
  },
  watch: {
    isSave() {
      updateHome(this.historyInfo).then(() => {
        // console.log(response)
        this.fileList = []
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
      })
    }
  },
  computed: {
    header() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    handleDeleteHistory() {
      this.$confirm('是否删除此版块?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const delIndex = this.activeIndex
        const index = this.activeIndex === this.historyInfo.length - 1 ? this.activeIndex - 1 : this.activeIndex + 1
        this.swiper.slideTo(index, 1000, true)
        setTimeout(() => {
          this.swiper.slideTo(delIndex, 1, true)
          this.historyInfo.splice(delIndex, 1)
          this.postForm = this.historyInfo[this.activeIndex]
        }, 1000)
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
    handleNewHistory() {
      let newItem = {
        imgUrl: `${process.env.VUE_APP_RES_URL}/default.jpg`,
        title: 'default title',
        description: 'defautl description'
      }
      this.fileList = []
      this.postForm = newItem
      this.historyInfo.splice(this.activeIndex + 1, 0, newItem)
      this.swiper.slideTo(this.activeIndex + 1, 1000, true)
    },
    onSlideChange(activeIndex) {
      this.activeIndex = activeIndex
      this.fileList = []
      this.postForm = this.historyInfo[activeIndex]
    },
    onExceed() {
      this.$message({
        type: 'warning',
        message: '只能上传一张图片'
      })
    },
    onSuccess(response, file) {
      const data = response.data
      this.historyInfo[this.activeIndex].imgUrl = `${process.env.VUE_APP_RES_URL}/${data.fileName}`
      this.fileList.push(file)
    },
    onError(err) {
      if (err.status === 401) {
        getRole().then(() => {}).catch(() => {})
        return
      }
      this.$message({
        type: 'error',
        message: err.message.message
      })
    },
    onRemove() {
      const res = {
        fileName: this.historyInfo[this.activeIndex].imgUrl
      }
      removeImg(res).then(() => {
        // console.log(response)
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
      })
      this.fileList = []
      this.historyInfo[this.activeIndex].imgUrl = this.tempImgUrlArr[this.activeIndex]
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
    }
  },
  created() {
    getAdminHomeData().then(response => {
      const data = response.data.data
      this.historyInfo = data.timebase
      this.postForm = this.historyInfo[0]
      this.historyInfo.forEach((item, index) => {
        this.tempImgUrlArr[index] = item.imgUrl
      })
    }).catch(err => {
      console.log({ err })
      this.$message({
        type: 'error',
        message: err.message
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.editHome-container {
  position: relative;
  .el-divider {
    position: relative;
    top: 20px;
    .el-divider__text {
      font-size: 36px;
    }
  }
  .history-edit-content {
    position: relative;
    display: flex;
    top: 25px;
    .content-left-wrapper {
      vertical-align: top;
      height: 600px;
      width: 40%;
    }
    .content-right-wrapper {
      vertical-align: top;
      height: 600px;
      width: 60%;
      .upload-wrapper {
        position: relative;
        top: 15px;
        padding-right: 10%;
        div {
          height: 215.6px;
        }
      }
      .form-wrapper {
        top: 25px;
        position: relative;
        padding-right: 10%;
        .el-form-item {
          margin-bottom: 15px;
          .el-button {
            font-size: 15px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-upload {
  display: block;
  .el-upload-dragger {
    width: 100%;
  }
}
.form-wrapper {
  .el-form-item__label {
    padding-bottom: 0;
  }
  .el-textarea__inner {
    font-size: 20px;
    font-weight: 400;
    font-family: Arial, Helvetica, sans-serif;
  }
  .el-input__inner {
    font-size: 20px;
    font-weight: 400;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
