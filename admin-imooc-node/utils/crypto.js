const crypto = require('crypto') // node自带的库

function md5(s) {
  return crypto.createHash('md5').update(String(s)).digest('hex')
}

module.exports = {
  md5
}