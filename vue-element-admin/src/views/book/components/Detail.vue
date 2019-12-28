<template>
  <el-form ref="postForm" :model="postForm">
    <sticky :class-name="'sub-navbar'">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button
        v-loading="loading"
        type="success"
        @click="submitForm"
      >{{ isEdit ? '编辑电子书' : '新增电子书' }}</el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <warning />
        <el-col :span="24">
          <ebook-upload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24">
          <el-form-item prop="title">
            <MdInput
              v-model="postForm.title"
              :maxlength="100"
              name="name"
              required
            >书名</MdInput>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者：" :label-width="labelWidth">
                <el-input v-model="postForm.author" placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出版社：" :label-width="labelWidth">
                <el-input v-model="postForm.publisher" placeholder="出版社" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="语言：" :label-width="labelWidth">
                <el-input v-model="postForm.language" placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="根文件：" :label-width="labelWidth">
                <el-input v-model="postForm.rootFile" placeholder="根文件" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件路径：" :label-width="labelWidth">
                <el-input v-model="postForm.filePath" placeholder="文件路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="解压路径：" :label-width="labelWidth">
                <el-input v-model="postForm.unzipPath" placeholder="解压路径" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="封面路径：" :label-width="labelWidth">
                <el-input v-model="postForm.coverPath" placeholder="封面路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文件名称：" :label-width="labelWidth">
                <el-input v-model="postForm.originalName" placeholder="文件名称" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="封面：" :label-width="labelWidth">
                <a v-if="postForm.coverUrl" :href="postForm.coverUrl" target="_blank">
                  <img src="postForm.coverUrl" class="preview-img">
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="目录：" :label-width="labelWidth">
                <div v-if="postForm.contents && postForm.contents.length > 0" class="contents-wapper">
                  <el-tree :data="contentsTree" @node-click="onContentClick" />
                </div>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>
<script>
import Sticky from '@/components/Sticky/index'
import Warning from './Warning'
import EbookUpload from '@/components/EbookUpload/index'
import MdInput from '@/components/MDinput/index'
export default {
  components: {
    Sticky, Warning, EbookUpload, MdInput
  },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      loading: false,
      postForm: {
        status: 'draft'
      },
      fileList: [],
      labelWidth: '120px',
      contentsTree: []
    }
  },
  methods: {
    onContentClick(data) {
      if (data.text) {
        window.open(data.text)
      }
    },
    setData(data) {
      const {
        title,
        author,
        publisher,
        language,
        rootFile,
        coverUrl,
        url,
        originalName,
        contents,
        fileName,
        coverPath,
        filePath,
        unzipPath,
        contentsTree
      } = data
      this.postForm = {
        ...this.postForm,
        title,
        author,
        publisher,
        language,
        rootFile,
        coverUrl,
        url,
        originalName,
        contents,
        fileName,
        coverPath,
        filePath,
        unzipPath,
        contentsTree
      }
      this.contentsTree = contentsTree
    },
    onUploadRemove() {
      console.log('onUploadRemove')
    },
    onUploadSuccess(data) {
      console.log('onUploadSuccess', data)
      this.setData(data)
    },
    showGuide() {
      console.log('showGuide')
    },
    submitForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-container {
  padding: 10px 50px 20px;
  .preview-img {
    width: 200px;
    height: 270px;
  }
}
</style>
