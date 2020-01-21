const {
  CODE_ERROR,
  CODE_SUCCESS
} = require('../utils/constant')

class BaseModel {
  constructor (data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.error = CODE_SUCCESS
  }
}

class ErrorModel extends BaseModel {
  constructor (data, message) {
    super(data, message)
    this.error = CODE_ERROR
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}