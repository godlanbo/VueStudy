const express = require('express')
const boom = require('boom')
const router = express.Router()
const { ErrorModel, SuccessModel } = require('../model/resModel')

const path = require('path')
const fs = require('fs')

router.get('/getData', (req, res, next) => {
  const fileName = path.join(__dirname, '../model/homeData.json')
  let data = fs.readFileSync(fileName, 'utf8')
  data = JSON.parse(data)
  res.json(new SuccessModel(data))
})

module.exports = router