const express = require('express')
const boom = require('boom')
const router = express.Router()
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { getData } = require('../utils/data')

router.get('/getData', (req, res, next) => {
  getData('timebaseItem').then(data => {
    res.json(new SuccessModel(data))
  }).catch(err => {
    res.json(new ErrorModel(err))
  })
})

module.exports = router