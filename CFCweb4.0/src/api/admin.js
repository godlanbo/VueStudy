import request from '../utils/request'
import { setToken } from '../utils/auth'

export function login(userInfo) {
  const loginRequest = request({
    url: '/login',
    method: 'post',
    data: userInfo
  })
  return new Promise((resolve, reject) => {
    loginRequest.then(response => {
      const { data } = response.data
      setToken(data.token)
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}