const express = require('express')
const boom = require('boom')
const fs = require('fs')
const router = express.Router()
const multer = require('multer')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { md5 } = require('../utils/crypto')
const { SALT_VALUE, PRIVATE_KEY, JWT_EXPIRED, UPLOAD_IMG_PATH } = require('../utils/constant')
const { login } = require('../services/admin')
const { getData, replaceData } = require('../utils/data')
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
    const type = req.body.destination
    if (!type) {
      cb(null, `${UPLOAD_IMG_PATH}`)
    } else {
      cb(null, `${UPLOAD_IMG_PATH}/${type}`)
    }
  },
  // 文件名字
  filename: function (req, file, cb) {
    const type = req.body.destination
    const suffix = file.mimetype.split('/').pop()
    if (!type) {
      cb(null, `img-${Date.now()}.${suffix}`)
    } else {
      cb(null, `${type}-${Date.now()}.${suffix}`)
    }
  }
})

// 上传图片
router.post(
  '/uploadImg',
  multer({ storage }).single('file'),
  (req, res, next) => {
    console.log(req.body)
    res.json(new SuccessModel({fileName: req.file.filename}, 'success'))
  }
)
// 当移除上传的预览图片时，删除本地文件
router.get('/removeImg', (req, res, next) => {
  // console.log(req.query)
  const { fileName } = req.query
  const file = fileName.split('/').pop()
  const type = file.split('-')[0]
  let filePath
  if (type === 'img') {
    filePath = `${UPLOAD_IMG_PATH}/${file}`
  } else if (type === 'studioImg') {
    filePath = `${UPLOAD_IMG_PATH}/studioImg/${file}`
  }
  
  // console.log(filePath)
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
    res.json(new SuccessModel('成功移除文件'))
  } catch(err) {
    res.json(new ErrorModel('移除文件时出现问题'))
  }
})
// 更新home页面的更改api
router.post('/updateHome', async (req, res, next) => {
  try {
    const historyInfo = await getData('homeTimebase')
    const studioInfo = await getData('homeImgs')
    const teamInfo = await getData('homeTeam')

    const newHistoryInfo = req.body.historyInfo
    const newStudioInfo = req.body.studioInfo
    const newTeamInfo = req.body.teamInfo

    await replaceData(newHistoryInfo, 'homeTimebase')
    await replaceData(newStudioInfo, 'homeImgs')
    await replaceData(newTeamInfo, 'homeTeam')

    const historyInfoImg = []
    const newHistoryInfoImg = []
    const studioInfoImg = []
    const newStudioInfoImg = []
    const teamInfoImg = []
    const newTeamInfoImg = []

    teamInfo.forEach(item => {
      teamInfoImg.push(item.imgUrl.split('/').pop())
    })
    newTeamInfo.forEach(item => {
      newTeamInfoImg.push(item.imgUrl.split('/').pop())
    })
    studioInfo.forEach(item => {
      studioInfoImg.push(item.src.split('/').pop())
    })
    newStudioInfo.forEach(item => {
      newStudioInfoImg.push(item.src.split('/').pop())
    })
    historyInfo.forEach(item => {
      historyInfoImg.push(item.imgUrl.split('/').pop())
    })
    newHistoryInfo.forEach(item => {
      newHistoryInfoImg.push(item.imgUrl.split('/').pop())
    })

    teamInfoImg.forEach(item => {
      if (!newTeamInfoImg.includes(item)) {
        const imgFilePath = `${UPLOAD_IMG_PATH}/memberImg/${item}`
        if (fs.existsSync(imgFilePath)) {
          fs.unlinkSync(imgFilePath)
        }
      }
    })
    studioInfoImg.forEach(item => {
      if (!newStudioInfoImg.includes(item)) {
        const imgFilePath = `${UPLOAD_IMG_PATH}/studioImg/${item}`
        if (fs.existsSync(imgFilePath)) {
          fs.unlinkSync(imgFilePath)
        }
      }
    })
    historyInfoImg.forEach(item => {
      if (!newHistoryInfoImg.includes(item) && item !== 'default.jpg') {
        const imgFilePath = `${UPLOAD_IMG_PATH}/${item}`
        if (fs.existsSync(imgFilePath)) {
          fs.unlinkSync(imgFilePath)
        }
      }
    })
    res.json(new SuccessModel('成功提交首页的修改'))
  } catch(err) {
    res.json(new ErrorModel(err.message))
  }
})

module.exports = router