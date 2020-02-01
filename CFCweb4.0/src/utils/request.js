import axios from 'axios'
import { getToken } from '@/utils/auth'
// import { MessageBox, Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8000/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log({ error })
    return Promise.reject(error)
  }
)

export default service
