const express = require('express')
const multer = require('multer')
const { UPLOAD_PATH } = require('../utils/constant')
const { SuccessModel, ErrorModel } = require('../model/Result')
const Book = require('../model/Book')
const router = express.Router()

router.post(
  '/upload',
  multer({ dest: `${UPLOAD_PATH}/book` }).single('file'),
  (req, res, next) => {
    if (!req.file || req.file.length === 0) {
      res.json(ErrorModel.Error('上传电子书失败'))
    } else {
      const book = new Book(req.file)
      console.log(book)
      res.json(new SuccessModel('上传电子书成功'))
    }
  }
)

module.exports = router