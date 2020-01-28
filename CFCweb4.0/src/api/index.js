import request from '../utils/request'

export function submitJoinData(data) {
  return request({
    url: '/join-us',
    method: 'post',
    data: data
  })
}

export function queryTeamInfo(queryString) {
  return request({
    url: '/queryInfo',
    method: 'post',
    data: { queryString }
  })
}
