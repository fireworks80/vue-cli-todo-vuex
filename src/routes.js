export default [
  {
    path: '/',
    name: 'HOME',
    component: () => import('@/components/home/Home'),
    beforeEnter(to, from, next) {
      // console.log(to)
      next()
    }
  },
  {
    path: '/todo',
    name: 'TODO',
    component: () => import('@/components/todo/Todo')
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
