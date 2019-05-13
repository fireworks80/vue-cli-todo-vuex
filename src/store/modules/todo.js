import Config from '@/config/Config.todo'
import XHR from '@/apis/api'

export default {
  state: {
    todolist: []
  },
  getters: {
    [Config.GETLIST](state) {
      return state.todolist.sort((a, b) => b.id - a.id)
    }
  },
  mutations: {
    [Config.FETCH](state, payload) {
      // console.log(payload)
      state.todolist = payload
    },
    [Config.EDITFORM](state, payload) {
      // console.log(payload)
      state.todolist.forEach(item => {
        item.edit = item.id === payload ? true : false
      })
    }
  },
  actions: {
    async [Config.FETCH](store, payload) {
      store.commit(Config.FETCH, await XHR.get(Config.BASEURL))
    },
    async [Config.ADD](store, payload) {
      // console.log(payload)
      let result = await XHR.add(Config.BASEURL, {
        todo: payload,
        edit: false,
        done: false
      })

      if (result === 'ok') {
        store.dispatch(Config.FETCH)
      }
    },
    async [Config.TOGGLE](store, payload) {
      let result = await XHR.update(Config.BASEURL, payload)

      if (result === 'ok') store.dispatch(Config.FETCH)
    },
    async [Config.UPDATE](store, { todo, id }) {
      let result = await XHR.update(Config.BASEURL, {
        id,
        edit: false,
        todo
      })

      if (result !== 'ok') throw new Error('수정 오류')

      store.dispatch(Config.FETCH)
    },
    async [Config.DELETE](store, payload) {
      let result = await XHR.del(Config.BASEURL, payload)

      if (result !== 'ok') throw new Error('삭제 오류')

      store.dispatch(Config.FETCH)
    }
  }
}
