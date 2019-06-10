import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const rejectAuthuser = (to, from, next) => {
  if (store.state.isAuth) {
    // 로그인된 유저
    alert('이미 로그인 됨')
    next('/')
  } else {
    next()
  }
}

const checkAccessibility = (to, from, next) => {
  console.log('from: ', from)
  console.log('to: ', to)
  if (store.state.isAuth) {
    next()
  } else {
    alert('잘못된 접근입니다')
    next('/')
  }
}

export default new VueRouter({
  mode: 'history',
  base: process.env.PASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/home/Home')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('@/components/todo/Todo')
    },
    {
      path: '/memo',
      name: 'memo',
      component: () => import('@/components/memo/Memo')
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('@/components/user/Mypage')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: rejectAuthuser,
      component: () => import('@/components/user/Login')
    },
    {
      path: '/join',
      beforeEnter: rejectAuthuser,
      component: () => import('@/components/user/Join')
    },
    {
      path: '*',
      component: () => import('@/components/error/NotFound')
    }
  ]
})
