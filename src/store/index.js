import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Config from '@/Config'
import XHR from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todolist: []
  },
  getters: {
    [Config.GETLIST](state) {
      return state.todolist.sort((a, b) => b.id - a.id)
    }
  },
  mutations: {
    [Config.INIT](state, payload) {
      // console.log(payload)
      state.todolist = payload;
    },
    [Config.EDITFORM](state, payload) {
      // console.log(payload)
      state.todolist.forEach(item => {
        item.edit = item.id === payload ? true : false
      })
    }
  },
  actions: {
    async [Config.INIT](store, payload) {
      store.commit(Config.INIT, await XHR.fetch())
    },
    async [Config.ADD](store, payload) {
      // console.log(payload)
      let result = await XHR.post({
        todo: payload,
        edit: false,
        done: false
      });

      if (result === 'ok') {
        store.dispatch(Config.INIT);
      }
    },
    async [Config.TOGGLE](store, payload) {
      let result = await XHR.patch(payload);

      if (result === 'ok') store.dispatch(Config.INIT);
    },
    async [Config.EDIT](store, {
      todo,
      id
    }) {

      let result = await XHR.patch({
        id,
        edit: false,
        todo
      })

      if (result !== 'ok') throw new Error('수정 오류')

      store.dispatch(Config.INIT)
    },
    async [Config.DELETE](store, payload) {
      let result = await XHR.del(payload)

      if (result !== 'ok') throw new Error('삭제 오류')

      store.dispatch(Config.INIT)
    }
  }
});