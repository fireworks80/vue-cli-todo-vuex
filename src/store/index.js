import Vue from 'vue';
import Vuex from 'vuex';
import todos from '@/store/modules/todo';
import memos from '@/store/modules/memo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    todos,
    memos
  }
});
