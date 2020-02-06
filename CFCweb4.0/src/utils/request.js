import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/api`, // url = base url + request url
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
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.message || '请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Has Error'))
    } else {
      return response
    }
  },
  error => {
    const { response } = error
    if (response.status === 401) {
      MessageBox.alert('登录超时，请再次登录', '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        store.dispatch('app/resetToken').then(() => {
          if (!router.history.current.query) {
            const redirect = router.history.current.path
            router.push({ path: `/login?redirect=${redirect}` }, () => {})
          }
        })
      })
    } else {
      Message.error(response.data.message || error.message || 'Has Error')
    }
    console.log({ error })
    return Promise.reject(error)
  }
)

export default service
