const express = require('express')
const boom = require('boom')
const router = express.Router()
const { ErrorModel, SuccessModel } = require('../model/resModel')
const { getData } = require('../utils/data')

router.get('/getTeamData', async (req, res, next) => {
  try {
    const resData = {} // timebase imgs ourTeam
    resData.teamInfo = await getData('team')
    res.json(new SuccessModel(resData))
  } catch(err) {
    res.json(new ErrorModel(err))
  }
})

module.exports = router