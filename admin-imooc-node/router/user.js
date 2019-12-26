const express = require('express')
const { SuccessModel, ErrorModel } = require('../model/Result')
const { login, queryUserInfo } = require('../services/user')
const {
  debug,
  PWD_SALT,
  PRIVATE_KEY,
  JWT_EXPIRED
} = require('../utils/constant')
const { md5 } = require('../utils/crypto')
const { body, validationResult } = require('express-validator')
const boom = require('boom')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post(
  '/login',
  [
    body('username').isString().withMessage('用户名必须为字符串'),
    body('password').isString().withMessage('密码必须为字符串')
  ],
  (req, res, next) => {
    debug && console.log('req.body', req.body)
    const err = validationResult(req)
    if (!err.isEmpty()) {
      const [{ msg }] = err.errors
      next(boom.badRequest(msg))
    } else {
      let { username, password } = req.body
      // 对密码加密
      password = md5(`${password}${PWD_SALT}`)
      // 调用login方法
      login(username, password).then(result => {
        if (!result || result.length === 0) {
          res.json(ErrorModel.Error('登陆失败'))
        } else {
          const token = jwt.sign(
            { username },
            PRIVATE_KEY,
            { expiresIn: JWT_EXPIRED }
          )
          res.json(new SuccessModel({ token }, '登录成功'))
        }
      }).catch(err => {
        console.log('Error:', err)
        res.json(ErrorModel.Error('登陆失败'))
      })
    }
  }
)
router.get('/info', (req, res, next) => {
  const username = req.user.username
  if (username) {
    queryUserInfo(username).then(userData => {
      if (userData) {
        userData.roles = [userData.role]
        res.json(new SuccessModel(userData, '查询成功'))
      } else {
        res.json(ErrorModel.Error('此用户不存在'))
      }
    })
  } else {
    res.json(ErrorModel.NoToken('token解析失败'))
  }
})

module.exports = router