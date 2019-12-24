const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'jyl62166123',
    port: '3306',
    database: 'myblog',
    // 是否允许一个query中有多条MySQL语句
    multipleStatements: true
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'jyl62166123',
    port: '3306',
    database: 'myblog',
    // 是否允许一个query中有多条MySQL语句
    multipleStatements: true
  }
}

module.exports = {
  MYSQL_CONF
}