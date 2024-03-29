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


// fun1(x).then(async result => {
//   if (result > 0) {
//     const result = await fun2(2)
//   } else {
//     const result = await fun3(2)
//   }
// })

module.exports = {
  SuccessModel,
  ErrorModel: new ErrorModel()
}