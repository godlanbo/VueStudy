import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

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
    Message.error(error.message)
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // console.log(response)
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.message === 'jwt expired') {
        // to re-login
        MessageBox.alert('登录超时，请再次登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          store.dispatch('app/resetToken').then(() => {
            // location.reload()
            // router.push('/login')
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    const { response } = error
    const res = response.data
    if (res.message === 'jwt expired') {
      MessageBox.alert('登录超时，请再次登录', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        store.dispatch('app/resetToken').then(() => {
          // location.reload()
        })
      })
    } else {
      Message.error(error.message)
    }
    console.log({ error })
    return Promise.reject(error)
  }
)

export default service
