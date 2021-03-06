import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/home', '/time-base', '/team'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  // document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/admin' })
        NProgress.done()
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const hasRole = store.getters.role
        if (hasRole && hasRole === 'superAdmin') {
          next()
        } else {
          try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const role = await store.dispatch('app/getRole')
            // generate accessible routes map based on roles
            // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
            // dynamically add accessible routes
            // router.addRoutes(accessRoutes)
            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            if (role !== 'superAdmin') {
              await store.dispatch('app/resetToken')
              Message.error('身份验证出错')
              next(`/login?redirect=${to.path}`)
            } else {
              next()
              // next()
            }
            // next({ ...to, replace: true })
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('app/resetToken')
            // Message.error(error.message || 'Has Error')
            next(`/login?redirect=${to.path}`)
            NProgress.done()
          }
        }
      }
    } else {
      /* has no token*/
      // 重定向到login页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
