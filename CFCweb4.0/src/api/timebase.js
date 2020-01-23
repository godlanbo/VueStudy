import request from '../utils/request'

export function getTimeBaseData() {
  return request({
    url: '/timebase/getData',
    method: 'get'
  })
}
