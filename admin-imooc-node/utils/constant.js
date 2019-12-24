module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_NO_TOKEN: -2,
  debug: process.env.NODE_ENV === 'dev',
  PWD_SALT: 'admin_imooc_node',
  PRIVATE_KEY: 'godlanbo',
  JWT_EXPIRED: 60 * 60  // 过期时间（秒级）
}