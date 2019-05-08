import Config from '@/config/Config.memo'
import XHR from '@/apis/api.memo'

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
      commit(Config.FETCH, await XHR.fetch())
    }
  }
}
