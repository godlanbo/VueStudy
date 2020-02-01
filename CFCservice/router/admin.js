const express = require('express')
const boom = require('boom')
const router = express.Router()
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { md5 } = require('../utils/crypto')
const { SALT_VALUE, PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')
const { login } = require('../services/admin')
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

module.exports = router