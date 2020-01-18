import Vue from 'vue'
import Router from 'vue-router'
import HeaderBar from '@/views/HomePage/components/HeaderBar'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    component: HeaderBar,
    redirect: '/Home',
    children: [
      {
        path: 'Home',
        component: () => import('@/views/HomePage/Home'),
        name: 'Home',
        // meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router