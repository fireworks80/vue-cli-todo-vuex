import Vue from 'vue';
import Vuex from 'vuex';
import todos from '@/store/modules/todo';
// import Config from '@/Config'
// import XHR from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos
  }
});
