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
    [Config.TOGGLE](store, payload) {

      // debugger;


      // axios.patch(Config.BASEURL + id, {
      //     done: !done
      //   })
      //   .then(res => store.dispatch(Config.INIT))
      //   .catch(err => console.log(err))
    },
    [Config.EDIT](store, {
      text,
      id
    }) {
      const param = {
        edit: false
      };
      try {
        // debugger;
        if (!text) {
          throw new Error('수정할 내용을 입력');
          // return;
        }
        param.todo = text;
      } catch (e) {
        console.log(e);
      }
      // console.log(param);
      axios.patch(Config.BASEURL + id, param)
        .then(res => store.dispatch(Config.INIT))
        .catch(err => console.log(err))
    },
    [Config.DEL](store, payload) {
      axios.delete(Config.BASEURL + payload)
        .then(res => store.dispatch(Config.INIT))
        .catch(err => console.log(err))
    }
  }
});