const expressJwt = require('express-jwt')
const { PRIVATE_KEY } = require('./constant')

const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true
}).unless({
  path: [
    '/',
    '/user/login'
  ]
})

function decode(req) {
  let token = req.user
  console.log(token)
}

module.exports = {
  jwtAuth,
  decode
}