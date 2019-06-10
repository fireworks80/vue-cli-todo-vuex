import Vue from 'vue'
import Vuex from 'vuex'
import UserApi from '@/apis/UserAPI'
import router from '@/router'
import todos from '@/store/modules/todo'
import memos from '@/store/modules/memo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    isAuth: false
  },
  modules: {
    todos,
    memos
  },
  getters: {
    getAuth: state => state.isAuth
  },
  mutations: {
    setAuth(state, { username, isAuth }) {
      state.username = username
      state.isAuth = isAuth
    }
  },
  actions: {
    async join({ commit }, payload) {
      const result = await UserApi.join('/authenticate/join', payload)
      commit('setAuth', result)
      router.push({ name: 'home' })
    },
    async login({ state, commit }, payload) {
      const result = await UserApi.login(`/authenticate`, payload)
      commit('setAuth', result)
      router.push({ name: 'home' })
    },
    async getUserInfo({ commit }) {
      const result = await UserApi.getUserInfo('/authenticate')
      commit('setAuth', result)
    },
    async logout({ commit }) {
      const result = await UserApi.logout('/authenticate/logout')
      commit('setAuth', result)
      router.push({ name: 'home' })
    }
  }
})
