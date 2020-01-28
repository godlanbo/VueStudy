const path = require('path')

// const env = process.NODE_ENV
const DATA_PATH = path.resolve(__dirname, '../data/sql.json')
const CODE_ERROR = -1
const CODE_SUCCESS = 0

module.exports = {
  CODE_ERROR,
  CODE_SUCCESS,
  DATA_PATH
}