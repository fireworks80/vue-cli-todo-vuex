import Config from '@/config/Config.memo'
import XHR from '@/apis/api'

export default {
  state: {
    memoList: []
  },
  mutations: {
    [Config.FETCH](state, payload) {
      // debugger
      state.memoList = payload
    }
  },
  actions: {
    async [Config.FETCH]({ commit }) {
      console.log('memo action')
      commit(Config.FETCH, await XHR.get(Config.BASEURL))
    },
    async [Config.ADD]({ dispatch }, payload) {
      let result = await XHR.add(Config.BASEURL, payload)

      if (result !== 'ok') throw new Error('저장에 문제가 생김')

      dispatch(Config.FETCH)
    },
    async [Config.UPDATE]({ dispatch }, payload) {
      payload.visible = !payload.visible
      let result = await XHR.update(Config.BASEURL, payload)

      if (result !== 'ok') throw new Error('update에 문제 생김')
      dispatch(Config.FETCH)
    }
  }
}
