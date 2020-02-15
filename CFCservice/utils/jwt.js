const expressJwt = require('express-jwt')
const { PRIVATE_KEY } = require('./constant')

const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  credentialsRequired: true
}).unless({
  path: [
    '/',
    '/api/login',
    '/api/home/getData',
    '/api/timebase/getData',
    '/api/join-us',
    '/api/queryInfo'
  ]
})

module.exports = {
  jwtAuth
}