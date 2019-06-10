<template>
  <section>
    <h2>Login</h2>
    <form>
      <p><input v-model="username" type="text" placeholder="username"></p>
      <p><input v-model="password" type="password" placeholder="password"></p>
      <button @click="login({username, password})" type="button">로그인</button>
    </form>
  </section>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login'])
  }
}
</script>
