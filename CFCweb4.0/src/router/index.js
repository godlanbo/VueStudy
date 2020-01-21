import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/layout/index'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomePage/Home'),
        name: 'Home'
        // meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      },
      {
        path: 'time-base',
        component: () => import('@/views/TimeBase/TimeBase'),
        name: 'TimeBase'
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router