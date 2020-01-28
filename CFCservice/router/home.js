const express = require('express')
const boom = require('boom')
const router = express.Router()
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { getData } = require('../utils/data')

router.get('/getData', async (req, res, next) => {
  try {
    const resData = {} // timebase imgs ourTeam
    resData.timebase = await getData('homeTimebase')
    resData.imgs = await getData('homeImgs')
    resData.ourTeam = await getData('homeTeam')
    res.json(new SuccessModel(resData))
  } catch(err) {
    res.json(new ErrorModel(err))
  }
})

module.exports = router