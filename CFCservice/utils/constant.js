const path = require('path')

// const env = process.NODE_ENV
const DATA_PATH = path.resolve(__dirname, '../data/sql.json')
const UPLOAD_IMG_PATH = path.resolve(__dirname, '../img')
const CODE_ERROR = -1
const CODE_SUCCESS = 0

module.exports = {
  CODE_ERROR,
  CODE_SUCCESS,
  DATA_PATH,
  PRIVATE_KEY: 'cfc2013114',
  SALT_VALUE: 'godlanbo',
  JWT_EXPIRED: 60 * 60 * 24,
  UPLOAD_IMG_PATH
}