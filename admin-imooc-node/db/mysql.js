const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/conf')
const { isObject } = require('../utils/index')

// 创建mysql连接池
const pool = mysql.createPool(MYSQL_CONF)
// 统一处理sql语句
function querySql(sql) {
  // 使用promise对象处理查询的数据
  const promise = new Promise((resolve, reject) => {
    // 从连接池里获取一个连接
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      } else {
        connection.query(sql, (err, result) => {
          if (err) {
            return reject(err)
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
function insert(model, tableName) {
  return new Promise((resolve, reject) => {
    if (!isObject(model)) {
      reject(new Error('插入数据库失败，图书不合法'))
    } else {
      const keys = []
      const values = []
      Object.keys(model).forEach(key => {
        if (model.hasOwnProperty(key)) {
          keys.push(`\`${key}\``)
          values.push(`'${model[key]}'`)
        }
      })
      if (keys.length > 0 && values.length > 0) {
        let sql = `INSERT INTO \`${tableName}\` (`
        const keysString = keys.join(',')
        const valuesStirng = values.join(',')
        sql = `${sql}${keysString}) VALUES (${valuesStirng});`
        querySql(sql).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      } else {
        return new Error('插入数据库失败，对象为空')
      }
    }
  })
}
module.exports = {
  querySql,
  queryOne,
  insert,
  escape: mysql.escape
}