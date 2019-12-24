const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')
// const boom = require('express-boom')
// 创建 express 应用
const app = express()
// 错误信息返回中间件，注册处理函数在res中
// app.use(boom())
// 注册解析post数据的中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// 解决跨域问题中间件
app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   next()
// })
// 认证jwt token
// app.use(jwtAuth)

app.use('/', router)
// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(8000, function() {
  const { address, port } = server.address()
  console.log('Http Server is running on http://%s:%s', address, port)
})