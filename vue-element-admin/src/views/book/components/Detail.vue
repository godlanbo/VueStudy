<template>
  <el-form ref="postForm" :model="postForm" :rules="rules">
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
              <el-form-item prop="author" label="作者：" :label-width="labelWidth">
                <el-input v-model="postForm.author" placeholder="作者" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="publisher" label="出版社：" :label-width="labelWidth">
                <el-input v-model="postForm.publisher" placeholder="出版社" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="language" label="语言：" :label-width="labelWidth">
                <el-input v-model="postForm.language" placeholder="语言" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="rootFile" label="根文件：" :label-width="labelWidth">
                <el-input v-model="postForm.rootFile" placeholder="根文件" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="filePath" label="文件路径：" :label-width="labelWidth">
                <el-input v-model="postForm.filePath" placeholder="文件路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="unzipPath" label="解压路径：" :label-width="labelWidth">
                <el-input v-model="postForm.unzipPath" placeholder="解压路径" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="coverPath" label="封面路径：" :label-width="labelWidth">
                <el-input v-model="postForm.coverPath" placeholder="封面路径" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="originalName" label="文件名称：" :label-width="labelWidth">
                <el-input v-model="postForm.originalName" placeholder="文件名称" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="coverUrl" label="封面：" :label-width="labelWidth">
                <a v-if="postForm.coverUrl" :href="postForm.coverUrl" target="_blank">
                  <img src="postForm.coverUrl" class="preview-img">
                </a>
                <span v-else>无</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="contents" label="目录：" :label-width="labelWidth">
                <div v-if="contentsTree && contentsTree.length > 0" class="contents-wapper">
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
import { createBook, getBook, updateBook } from '@/api/book'

const fields = {
  'title': '书名',
  'author': '作者',
  'publisher': '出版社',
  'language': '语言'
}
export default {
  components: {
    Sticky, Warning, EbookUpload, MdInput
  },
  props: {
    isEdit: Boolean
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (!value || value.length === 0) {
        callback(new Error(fields[rule.field] + '不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      postForm: {
        status: 'draft'
      },
      fileList: [],
      labelWidth: '120px',
      contentsTree: [],
      rules: {
        title: [{ validator: validateRequire }],
        author: [{ validator: validateRequire }],
        publisher: [{ validator: validateRequire }],
        language: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      const fileName = this.$route.params.fileName
      this.getBookData(fileName)
    }
  },
  methods: {
    getBookData(fileName) {
      getBook(fileName).then(response => {
        response.data.coverUrl = response.data.cover
        delete response.data.cover
        this.setData(response.data)
      })
    },
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
      // this.fileList = [{ name: originalName, url }]
    },
    setDefault() {
      this.$refs.postForm.resetFields()
      this.contentsTree = []
      this.fileList = []
    },
    onUploadRemove() {
      this.setDefault()
    },
    onUploadSuccess(data) {
      console.log('onUploadSuccess', data)
      this.setData(data)
    },
    showGuide() {
      console.log('showGuide')
    },
    submitForm() {
      if (!this.loading) {
        this.loading = true
        this.$refs.postForm.validate((valid, fields) => {
          if (valid) {
            const book = Object.assign({}, this.postForm)
            delete book.contentsTree
            console.log(book)
            if (!this.isEdit) {
              createBook(book).then(response => {
                const { message } = response
                this.$notify({
                  title: '操作成功',
                  message,
                  type: 'success',
                  duration: 2000
                })
                this.loading = false
                this.setDefault()
              }).catch(() => {
                this.loading = false
              })
            } else {
              updateBook(book).then(response => {
                const { message } = response
                this.$notify({
                  title: '更新成功',
                  message,
                  type: 'success',
                  duration: 2000
                })
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            }
          } else {
            this.loading = false
            const message = fields[Object.keys(fields)[0]][0].message
            this.$message({
              type: 'error',
              message
            })
            return false
          }
        })
      }
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
