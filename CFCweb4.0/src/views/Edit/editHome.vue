<template>
  <div class="editHome-container">
    <el-divider content-position="left">History</el-divider>
    <div class="history edit-content">
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
    <el-divider content-position="left">Studio</el-divider>
    <div class="studio edit-content">
      <div class="content-left-wrapper">
        <div class="vueWaterfallEasy-wrapper">
          <div class="vueWaterfallEasy-content-wrapper">
            <vue-waterfall-easy
              ref="waterfall"
              @scrollReachBottom="cancelGetData"
              :linkRange="'img'"
              :imgsArr="studioInfo"
              :maxCols="3"
              :imgWidth="190"
              :gap="5"
            >
              <template class="img-info" v-slot="props">
                <div class="button-wrapper">
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="handleDeleteStudioImg(props.index, props.value)"
                  >删除</el-button>
                </div>
              </template>
            </vue-waterfall-easy>
          </div>
        </div>
      </div>
      <div class="content-right-wrapper">
        <div class="upload-wrapper">
          <el-upload
            :action="activeStudio"
            :headers="header"
            :file-list="studioFileList"
            :before-upload="beforeUpload"
            :on-success="onStudioSuccess"
            :on-error="onError"
            :on-remove="onStudioRemove"
            list-type="picture"
            show-file-list
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              请将图片拖入或 <em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
    <el-divider content-position="left">Our Team</el-divider>
    <div class="ourTeam edit-content">
      <team-swiper
        ref="teamSwiper"
        :memberInfo="teamInfo"
        @edit-member="handleEditMember"
        @delete-member="handleDeleteMember"
        @add-member="handleAddMember" />
    </div>
    <el-dialog
      title="人物信息编辑"
      :visible.sync="editMemberDialogVisiable"
      width="40%"
    >
      <div class="dialog-content">
        <div class="content-left-wrapper">
          <div class="upload-wrapper">
            <div class="img-wrapper">
              <img :src="imgDataUrl">
            </div>
            <el-button
              class="upload-btn"
              type="primary"
              icon="el-icon-upload"
              size="medium"
              @click="toggleShow"
            >上传头像</el-button>
              <my-upload
                field="img"
                @crop-success="cropSuccess"
                @crop-upload-success="cropUploadSuccess"
                @crop-upload-fail="cropUploadFail"
                v-model="show"
                :width="300"
                :height="300"
                :url="activeMember"
                :headers="header"
                noSquare
                img-format="png" />
          </div>
        </div>
        <div class="content-right-wrapper">
          <div class="dialog-form-wrapper">
            <el-form
              :model="postMemberForm"
              ref="form"
              label-suffix=":"
              label-width="80px"
              label-position="top"
            >
              <el-form-item label="姓名">
                <el-input v-model="postMemberForm.name"></el-input>
              </el-form-item>
              <el-form-item label="外号">
                <el-input v-model="postMemberForm.designation"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input type="textarea" resize="none" :rows="4" v-model="postMemberForm.detail"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <template v-slot:footer class="dialog-footer">
        <el-button type="primary" @click="savePostMemberForm">确 定</el-button>
        <el-button @click="editMemberDialogVisiable = false">取 消</el-button>
      </template>
    </el-dialog>
    <!-- <div style="height: 800px"></div> -->
  </div>
</template>
<script>
import DetailSwiper from './components/DetailSwiper'
import TeamSwiper from './components/swiper/Swiper'
import waves from '@/components/waves/waves'
import { getAdminHomeData, getRole, removeImg, updateHome } from '@/api/admin'
import { getToken } from '@/utils/auth'
import vueWaterfallEasy from 'vue-waterfall-easy'
import myUpload from 'vue-image-crop-upload';
// import Sticky from '@/components/Sticky'
export default {
  name: 'EditHome',
  components: {
    DetailSwiper,
    vueWaterfallEasy,
    TeamSwiper,
    myUpload
    // Sticky
  },
  directives: {
    waves
  },
  props: {
    shouldSave: Boolean
  },
  data() {
    return {
      active: `${process.env.VUE_APP_BASE_URL}/api/uploadImg`,
      activeStudio: `${process.env.VUE_APP_BASE_URL}/api/uploadStudioImg`,
      activeMember: `${process.env.VUE_APP_BASE_URL}/api/uploadMemberImg`,
      imgDataUrl: '',
      show: false,
      fileList: [],
      studioFileList: [],
      activeIndex: 0,
      editMemberDialogVisiable: false,
      postMemberForm: {
        name: '',
        designation: '',
        detail: ''
      },
      postForm: {
        title: '',
        description: ''
      },
      tempImgUrlArr: [],
      historyInfo: [],
      studioInfo: [],
      teamInfo: []
    }
  },
  watch: {
    historyInfo: {
      handler(newValue, oldValue) {
        if (oldValue.length !== 0) {
          this.$emit('change')
        }
      },
      deep: true
    },
    studioInfo: {
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
    teamInfo: {
      handler(newValue, oldValue) {
        if (oldValue.length === newValue.length) {
          this.$emit('change')
        }
      },
      deep: true
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
    savePostMemberForm() {
      // 编辑人物信息框的确认按钮，新增和编辑共用一个确认按钮，如果是编辑，直接关闭
      // 弹框即可，如果是新增（判断当前teamInfo中是否有此条信息）则在末尾添加这条信息
      const index = this.teamInfo.findIndex(item => {
        return item.name === this.postMemberForm.name
      })
      if (index === -1) {
        this.teamInfo.splice(-1, 0, this.postMemberForm)
      } else {
        // 确认替换编辑对象
        this.teamInfo.splice(index, 1, this.postMemberForm)
      }
      this.editMemberDialogVisiable = false
    },
    toggleShow() {
      this.show = true
    },
    cropSuccess(imgDataUrl) {
      this.imgDataUrl = imgDataUrl
    },
    cropUploadSuccess(response) {
      const { data } = response
      this.postMemberForm.imgUrl = `${process.env.VUE_APP_RES_URL}/memberImg/${data.fileName}`
    },
    cropUploadFail(status) {
      this.imgDataUrl = this.postMemberForm.imgUrl
      if (status === 401) {
        getRole().then(() => {}).catch(() => {})
        return
      }
      this.$message({
        type: 'error',
        message: `${status}:图片上传时发生错误`
      })
    },
    handleAddMember() {
      const newItem = {}
      this.postMemberForm = newItem
      this.imgDataUrl = `${process.env.VUE_APP_RES_URL}/memberImg/add.png`
      this.editMemberDialogVisiable = true
    },
    handleEditMember(index) {
      // 简单深拷贝编辑对象的属性，让编辑的时候可以取消编辑
      const editItem = Object.assign({}, this.teamInfo[index])
      this.postMemberForm = editItem
      this.imgDataUrl = editItem.imgUrl
      this.editMemberDialogVisiable = true
    },
    handleDeleteMember(index, indexInActivePages) {
      const nodes = document.querySelectorAll('.ourTeam.edit-content .swiper-wrapper > .team-wrapper.swiper-slide.swiper-slide-active > .member')
      var i = indexInActivePages
      var flag = setInterval(() => {
        nodes[i].classList.add('active')
        i++
        if (i >= nodes.length) {
          clearInterval(flag)
        }
      }, 200)
      setTimeout(() => {
        this.teamInfo.splice(index, 1)
        var flag = setInterval(() => {
          i--
          if (i < 0) {
            clearInterval(flag)
            return
          }
          nodes[i].classList.remove('active')
        }, 200)
      }, 800 - indexInActivePages * 200)
    },
    // 删除studio图片瀑布流中的图片
    handleDeleteStudioImg(index, value) {
      const fileName = value.src.split('/').pop()
      const delIndex = this.studioFileList.findIndex(item => {
        return item.response.data.fileName === fileName
      })
      if (delIndex !== -1) {
        this.onStudioRemove(this.studioFileList[delIndex])
      } else {
        this.studioInfo.splice(index, 1)
      }
    },
    // 取消瀑布图片的滚动到底加载
    cancelGetData() {
       this.$refs.waterfall.waterfallOver()
    },
    // 提交页面修改的方法，用给父组件调用
    update() {
      const res = {
        historyInfo: this.historyInfo,
        studioInfo: this.studioInfo,
        teamInfo: this.teamInfo.slice(0, -1)
      }
      updateHome(res).then(() => {
        this.$emit('successUpdate')
        this.fileList = []
        this.studioFileList = []
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
      })
    },
    // 删除一个timebase板块
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
    // 新增一个timebase板块
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
    // 当用户滑动展示板块的时候，修改展示的信息，对应激活的展示板块
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
    onStudioSuccess(response, file) {
      const data = response.data
      const newItem = {
        src: `${process.env.VUE_APP_RES_URL}/studioImg/${data.fileName}`,
        href: `${process.env.VUE_APP_RES_URL}/studioImg/${data.fileName}`
      }
      this.studioFileList.push(file)
      this.studioInfo.push(newItem)
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
    onStudioRemove(file) {
      const { response: { data: { fileName } } } = file
      let delIndex = this.studioFileList.findIndex(item => {
        return item.response.data.fileName === fileName
      })
      this.studioFileList.splice(delIndex, 1)
      delIndex = this.studioInfo.findIndex(item => {
        return item.src === fileName
      })
      this.studioInfo.splice(delIndex, 1)
      const res = {
        fileName
      }
      removeImg(res).then(() => {
        // console.log(response)
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
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
      // 获取后台信息
      const data = response.data.data
      this.historyInfo = data.timebase
      this.studioInfo = data.imgs
      this.teamInfo = data.ourTeam
      const addItem = {
        imgUrl: 'http://localhost:8090/memberImg/add.png',
        name: '',
        designation: '',
        detail: ''
      }
      this.teamInfo.push(addItem)
      // 以下为数据的一些提前处理
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
  .edit-content {
    margin-bottom: 60px;
    position: relative;
    display: flex;
    top: 25px;
    .content-left-wrapper {
      vertical-align: top;
      width: 40%;
      // height: 600px;
    }
    .content-right-wrapper {
      vertical-align: top;
      width: 60%;
      // height: 600px;
    }
  }
  .history {
    .content-right-wrapper {
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
  .studio {
    .content-right-wrapper {
      width: 51.8%;
      .upload-wrapper {
        padding-right: 10%;
        padding-left: 5%;
        position: relative;
        top: 13px;
        div {
          height: 513.25px;
          overflow: hidden;
          /deep/ .el-upload-list {
            height: 310px;
            overflow-y: scroll;
            padding-right: 2px;
            width: calc(100% + 18px);
          }
        }
      }
    }
    .content-left-wrapper {
      width: 48.2%;
      padding-top: 1%;
      padding-left: 3%;
      .vueWaterfallEasy-wrapper {
        overflow: hidden;
        border-radius: 16px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1),
        2px 0 12px 0 rgba(0,0,0,.1),-2px 0 12px 0 rgba(0,0,0,.1),
        0 -2px 12px 0 rgba(0,0,0,.1);
        position: relative;
        height: 500px;
        .vueWaterfallEasy-content-wrapper {
          height: 500px;
          width: 107%;
          margin: 0 auto;
          .button-wrapper {
            padding: 10px 0;
            text-align: center;
          }
        }
      }
    }
  }
  .ourTeam {
    top: 70px;
  }
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
        width: 40%;
        .upload-wrapper {
          .upload-btn {
            margin: 0 auto;
            display: block;
            margin-top: 20%;
          }
          .img-wrapper {
            text-align: center;
            img {
              width: 200px;
              height: 200px;
              border: 4px solid white;
              border-radius: 50%;
              box-shadow: inset 0 0 0 5px rgba(0,0,0,.05);
              box-shadow: 0 1px 3px rgba(0,0,0,.2);
            }
          }
        }
      }
      .content-right-wrapper {
        padding-left: 10px;
        padding-right: 10px;
        width: 60%;
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
<style lang="scss">
.vue-waterfall-easy {
  /* left: 47% !important; */
  margin-left: -305px !important;
}
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
  .el-textarea__inner, .el-input__inner {
    font-size: 20px;
    font-weight: 400;
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
