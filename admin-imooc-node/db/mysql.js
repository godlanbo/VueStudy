const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/conf')
const { debug } = require('../utils/constant')

// 创建mysql连接池
const pool = mysql.createPool(MYSQL_CONF)
// 统一处理sql语句
function querySql(sql) {
  debug && console.log(sql)
  // 使用promise对象处理查询的数据
  const promise = new Promise((resolve, reject) => {
    // 从连接池里获取一个连接
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      } else {
        connection.query(sql, (err, result) => {
          if (err) {
            reject(err)
            return
          } else {
            resolve(result)
          }
        })
      }
      // 释放本次连接
      connection.release()
    })
  })
  return promise
}

function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(result => {
      if (result && result.length > 0) {
        resolve(result[0])
      } else {
        resolve(null)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
module.exports = {
  querySql,
  queryOne,
  escape: mysql.escape
}