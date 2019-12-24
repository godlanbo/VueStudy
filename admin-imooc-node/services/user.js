const { querySql, escape, queryOne } = require('../db/mysql')

function login(username, password) {
  // 防止mysql注入
  username = escape(username)
  password = escape(password)
  // 使用escape之后拼接sql语句时变量不能使用‘’包裹
  return querySql(`select * from admin_user where username=${username} and password=${password}`)
}
function queryUserInfo(username) {
  username = escape(username)
  return queryOne(`select * from admin_user where username=${username}`)
}
module.exports = {
  login,
  queryUserInfo
}