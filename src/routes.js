// import Todo from '@/components/todo/Todo'
// import Memo from '@/components/memo/Memo'

export default [
  {
    path: '/',
    name: 'HOME',
    beforeEnter(to, from, next) {
      // console.log(to)
      // next('/todo')
    }
  },
  {
    path: '/todo',
    name: 'TODO',
    component: () => import('@/components/todo/Todo'),
    beforeEnter(to, from, next) {
      next()
    }
  },
  {
    path: '/memo',
    name: 'MEMO',
    component: () => import('@/components/memo/Memo')
  },
  {
    path: '*',
    component: () => import('@/components/error/NotFound')
  }
]
