const {
  CODE_ERROR,
  CODE_SUCCESS,
  CODE_NO_TOKEN
} = require('../utils/constant')

class SuccessModel {
  constructor (data, message, options) {
    if (typeof data === 'string') {
      this.message = data
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
    if (options) {
      this.options = options
    }
    this.code = CODE_SUCCESS
  }
}

class ErrorModel {
  // constructor (code, message, statusCode, options) {
  //   if (typeof code === 'string') {
  //     this.code = CODE_ERROR
  //     this.message = code
  //   }
  //   if (code) {
  //     this.code = code
  //   }
  //   if (message) {
  //     this.message = message
  //   }
  //   if (statusCode) {
  //     this.statusCode = statusCode
  //   }
  //   if (options) {
  //     this.options = options
  //   }
  // }
  Error (message) {
    return {
      code: CODE_ERROR,
      message,
      statusCode: 500
    }
  }
  NoToken (message) {
    return {
      code: CODE_NO_TOKEN,
      message,
      statusCode: 401
    }
  }
}

module.exports = {
  SuccessModel,
  ErrorModel: new ErrorModel()
}