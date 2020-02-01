const { getData } = require('../utils/data')

function login(username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      let adminData = await getData('admin')
      adminData = adminData[0]
      if (adminData.username === username && adminData.password === password) {
        resolve()
      } else {
        reject('账号或者密码错误')
      }
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = {
  login
}