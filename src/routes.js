// import Todo from '@/components/todo/Todo'
// import Memo from '@/components/memo/Memo'

export default [
  {
    path: '/',
    name: 'todo',
    component: () => import('@/components/todo/Todo')
  },
  {
    path: '/memo',
    name: 'memo',
    component: () => import('@/components/memo/Memo')
  }
]
