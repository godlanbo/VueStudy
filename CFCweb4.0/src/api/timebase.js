import request from '../utils/request'

export function getTimeBaseData() {
  return request({
    url: '/time-base/getData',
    method: 'get'
  })
}
