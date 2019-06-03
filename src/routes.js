export default [
  {
    path: '/',
    name: 'HOME',
    component: () => import('@/components/home/Home')
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
