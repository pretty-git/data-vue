import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录界面'
    }
  },
  {
    path: '/login',
    redirect: '/'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '中央控制管理系统'
    }
  },
  {
    path: '/berDetail',
    name: 'BerDetail',
    component: () => import('@/views/ber-detail.vue'),
    meta: {
      title: '泊位详情'
    }
  }
  ,
  {
    path: '/echart-message',
    name: 'EchartMessage',
    component: () => import('@/views/echart-message.vue'),
    meta: {
      title: '图表信息'
    }
  },
  {
    path: '/excel',
    name: 'Excel',
    component: () => import('@/views/excel.vue'),
    meta: {
      title: '报表查询'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
