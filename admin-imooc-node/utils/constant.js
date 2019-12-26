const path = require('path')
const env = process.env.NODE_ENV
const uploadPath = path.resolve(__dirname, '../../', 'admin-upload-ebook')
const UPLOAD_PATH = env === 'dev' ? uploadPath : uploadPath
const UPLOAD_URL = env === 'dev' ? 'http://localhost:8089' : 'http://localhost:8089'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_NO_TOKEN: -2,
  debug: process.env.NODE_ENV === 'dev',
  PWD_SALT: 'admin_imooc_node',
  PRIVATE_KEY: 'godlanbo',
  JWT_EXPIRED: 60 * 60,  // 过期时间（秒级）
  UPLOAD_PATH,
  UPLOAD_URL,
  MIME_TYPE_EPUB: 'application/epub+zip'
}