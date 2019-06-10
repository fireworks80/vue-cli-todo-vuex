import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.use(VueCookie)

new Vue({
  store,
  router,
  beforeCreate() {
    this.$store.dispatch('getUserInfo')
  },
  render: h => h(App)
}).$mount('#app')
