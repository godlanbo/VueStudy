const express = require('express')
const boom = require('boom')
const router = express.Router()
const homeRouter = require('../router/home')
const timebaseRouter = require('../router/timebase')
const adminRouter = require('../router/admin')
const taemRouter = require('../router/team')
const { jwtAuth } = require('../utils/jwt')
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { insertData, queryData } = require('../utils/data')

router.use(jwtAuth)

router.use('/api/home', homeRouter)
router.use('/api/timebase', timebaseRouter)
router.use('/api/team', taemRouter)
router.use('/api', adminRouter)

router.post('/api/join-us', (req, res, next) => {
  insertData(req.body, 'join').then(() => {
    res.json(new SuccessModel('提交成功'))
  }).catch(err => {
    res.json(new ErrorModel(err))
  })
})

router.post('/api/queryInfo', (req, res, next) => {
  queryData(req.body.queryString, 'team').then(data => {
    res.json(new SuccessModel(data))
  }).catch(err => {
    res.json(new ErrorModel(err))
  })
})
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
  const errorMsg = err.message || (err.output && err.output.payload && err.output.payload.message)
  const statusCode = (err.output && err.output.statusCode) || 500
  res.status(statusCode).json(new ErrorModel(errorMsg))
})
// 处理token错误
router.use((err, req, res, next) => {
  const statusCode = err.status || 500
  const errorMsg = err.message || 'token验证未通过'
  res.status(statusCode).json(new ErrorModel(errorMsg))
})
module.exports = router