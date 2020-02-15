const express = require('express')
const router = require('./router')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
// const boom = require('express-boom')
// 创建 express 应用
const app = express()
// 错误信息返回中间件，注册处理函数在res中
// app.use(boom())
// 注册解析post数据的中间件
const ENV = process.env.NODE_ENV
if (ENV !== 'prd') {
  app.use(logger('dev', {
    stream: process.stdout
  }))
} else {
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// 解决跨域问题中间件
app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })

app.use('/', router)
// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(8000, function() {
  const { address, port } = server.address()
  console.log('Http Server is running on http://%s:%s', address, port)
})