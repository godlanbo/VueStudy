const fs = require('fs')
const { DATA_PATH } = require('./constant')

function getData(tableName) {
  return new Promise((resolve, reject) => {
    try {
      let data = fs.readFileSync(DATA_PATH, 'utf8')
      resolve(JSON.parse(data)[tableName])
    } catch(err) {
      reject(err)
    }
  })
}

function insertData(model, tableName) {
  return new Promise(async (resolve, reject) => {
    try {
      let sqlData = fs.readFileSync(DATA_PATH, 'utf8')
      sqlData = JSON.parse(sqlData)
      sqlData[tableName].push(model)
      sqlData = JSON.stringify(sqlData, null, 2)
      fs.writeFileSync(DATA_PATH, sqlData, 'utf8')
      resolve()
    } catch(err) {
      reject(err)
    }
  })
}

function replaceData(model, tableName) {
  return new Promise(async (resolve, reject) => {
    try {
      let sqlData = fs.readFileSync(DATA_PATH, 'utf8')
      sqlData = JSON.parse(sqlData)
      sqlData[tableName] = model
      sqlData = JSON.stringify(sqlData, null, 2)
      fs.writeFileSync(DATA_PATH, sqlData, 'utf8')
      resolve()
    } catch(err) {
      reject(err)
    }
  })
}

function queryData(queryString, tableName) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await getData(tableName)
      const resData = data.filter(item => {
        return item.workCity === queryString
      })
      resolve(resData)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = {
  getData,
  insertData,
  queryData,
  replaceData
}

