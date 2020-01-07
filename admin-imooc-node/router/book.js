const express = require('express')
const multer = require('multer')
const { UPLOAD_PATH } = require('../utils/constant')
const { SuccessModel, ErrorModel } = require('../model/Result')
const Book = require('../model/Book')
const boom = require('boom')
const bookService = require('../services/book')
const router = express.Router()

router.post(
  '/upload',
  multer({ dest: `${UPLOAD_PATH}/book` }).single('file'),
  (req, res, next) => {
    if (!req.file || req.file.length === 0) {
      res.json(ErrorModel.Error('上传电子书失败'))
    } else {
      const book = new Book(req.file)
      book.parse().then(book => {
        res.json(new SuccessModel(book, '上传电子书成功'))
      }).catch(err => {
        next(boom.badImplementation(err))
      })
    }
  }
)

router.post(
  '/create',
  (req, res, next) => {
    const username = req.user.username
    if (username) {
      req.body.username = username
    }
    const book = new Book(null, req.body)
    bookService.insertBook(book).then(() => {
      res.json(new SuccessModel('添加电子书成功'))
    }).catch(err => {
      next(boom.badImplementation(err))
    })
  }
)

router.get('/get', (req, res, next) => {
  const { fileName } = req.query
  if (!fileName) {
    next(boom.badRequest('参数不能为空'))
  } else {
    bookService.getBook(fileName).then(book => {
      res.json(new SuccessModel(book, '获取图书信息成功'))
    }).catch(err => {
      next(boom.badImplementation(err))
    })
  }
})
module.exports = router