const express = require('express')
const boom = require('boom')
const fs = require('fs')
const router = express.Router()
const multer = require('multer')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { md5 } = require('../utils/crypto')
const { SALT_VALUE, PRIVATE_KEY, JWT_EXPIRED, UPLOAD_IMG_PATH } = require('../utils/constant')
const { login } = require('../services/admin')
const { getData } = require('../utils/data')
const jwt = require('jsonwebtoken')


router.post('/login', (req, res, next) => {
  let { username, password } = req.body
  password = md5(`${password}${SALT_VALUE}`)
  login(username, password).then(() => {
    const token = jwt.sign(
      { username },
      PRIVATE_KEY,
      { expiresIn: JWT_EXPIRED }
    )
    res.json(new SuccessModel({ token }, '登录成功'))
  }).catch(err => {
    next(boom.badImplementation(err))
  })
})

router.get('/roleInfo', (req, res, next) => {
  const username = req.user.username
  getData('admin').then(data => {
    data = data[0]
    const role = data.role
    if (data.username === username) {
      return res.json(new SuccessModel({ role }, '身份验证成功'))
    }
    res.json(new ErrorModel('身份验证出错'))
  }).catch(err => {
    next(boom.badImplementation(err.message))
  })
})
// 上传图片信息处理
const storage = multer.diskStorage({
  // 文件放置位置
  destination: function (req, file, cb) {
    cb(null, `${UPLOAD_IMG_PATH}`)
  },
  // 文件名字
  filename: function (req, file, cb) {
    const activeIndex = req.body.activeIndex
    cb(null, `index_${activeIndex}-${file.originalname}`)
  }
})

router.post(
  '/uploadImg',
  multer({ storage }).single('file'),
  (req, res, next) => {
    // console.log(req.file)
    res.json(new SuccessModel({fileName: req.file.filename}, 'success'))
  }
)

router.get('/removeImg', (req, res, next) => {
  // console.log(req.query)
  const { fileName, activeIndex } = req.query
  const imgFileName = `index_${activeIndex}-${fileName}`
  const filePath = `${UPLOAD_IMG_PATH}/${imgFileName}`
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    res.json(new SuccessModel('成功移除文件'))
  } catch(err) {
    res.json(new ErrorModel('移除文件时出现问题'))
  }
})

module.exports = router