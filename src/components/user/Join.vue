<template>
  <section>
    <h2 class="a11y">회원가입</h2>
    <form>
      <p><input v-model="username" type="text" placeholder="사용자명"></p>
      <p><input v-model="password" type="password" placeholder="비밀번호"></p>
      <button @click="join" type="button">회원가입</button>
    </form>
  </section>
</template>
<script>
export default {
  name: 'Join',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    join() {
      this.$store.dispatch('join', {username: this.username, password: this.password})
    }
  }
}
</script>
