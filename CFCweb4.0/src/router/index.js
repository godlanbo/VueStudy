import Vue from 'vue'
import Router from 'vue-router'
import layoutHome from '@/layoutHome'
import layoutAdmin from '@/layoutAdmin'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    component: layoutHome,
    redirect: '/home',
    hidden: true,
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
      },
      {
        path: 'team',
        component: () => import('@/views/Team/Team'),
        name: 'Team'
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    name: 'Login'
  },
  {
    path: '/admin',
    component: layoutAdmin,
    redirect: '/admin/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/admin/edit',
    component: layoutAdmin,
    redirect: '/admin/edit/home',
    meta: { title: '首页管理', icon: 'edit' },
    children: [{
        path: 'home',
        name: 'EditHome',
        component: () => import('@/views/Edit/index'),
        meta: { title: '编辑首页' }
    }, {
        path: 'time-base',
        name: 'EditTimebase',
        component: () => import('@/views/Edit/index'),
        meta: { title: '编辑时间轴' }
    }, {
        path: 'team',
        name: 'EditTeam',
        component: () => import('@/views/Edit/index'),
        meta: { title: '编辑团队' }
    }]
  }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router