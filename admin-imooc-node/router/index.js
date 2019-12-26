const express = require('express')
const boom = require('boom')
const { ErrorModel } = require('../model/Result')
const userRouter = require('./user')
const { jwtAuth } = require('../utils/jwt')
const router = express.Router()

router.use(jwtAuth)
router.get('/', (req, res, next) => {
  res.json({
    data: {
      code: 20000,
      msg: 'hello'
    }
  })
})

router.use('/user', userRouter)
/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在'))
})
/**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 */
// 处理一般错误
router.use((err, req, res, next) => {
  if (!err.isBoom) {
    return next(err)
  }
  const statusCode = (err.output && err.output.statusCode) || 500
  const errorMsg = (err.output && err.output.payload && err.output.payload.message) || err.message
  res.status(statusCode).json(ErrorModel.Error(errorMsg))
})
// 处理token错误
router.use((err, req, res, next) => {
  const statusCode = err.status || 500
  const errorMsg = 'token验证未通过'
  res.status(statusCode).json(ErrorModel.NoToken(errorMsg))
})
module.exports = router