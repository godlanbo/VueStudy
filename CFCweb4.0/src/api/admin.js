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

export function getRole() {
  return request({
    url: '/roleInfo',
    method: 'get',
  })
}

export function getAdminHomeData() {
  return request({
    url: '/home/getData',
    method: 'get'
  })
}

export function removeImg({ fileName }) {
  return request({
    url: '/removeImg',
    method: 'get',
    params: {
      fileName
    }
  })
}

export function updateHome(homeInfo) {
  return request({
    url: '/updateHome',
    method: 'post',
    data: homeInfo
  })
}