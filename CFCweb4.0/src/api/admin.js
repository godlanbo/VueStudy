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

export function getAdminTeamData() {
  return request({
    url: '/team/getTeamData',
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

export function updateHome(res) {
  return request({
    url: '/updateHome',
    method: 'post',
    data: res
  })
}

export function updateTimebase(res) {
  return request({
    url: '/updateTimebase',
    method: 'post',
    data: res
  })
}