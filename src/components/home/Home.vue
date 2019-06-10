<template>
  <section>
    <h2 class="a11y">home</h2>
    <p>Hello {{username}}</p>
    <div v-if="!isAuth">
      <router-link to="/join">회원가입</router-link>
      <router-link to="/login">로그인</router-link>
    </div>
  </section>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'Home',
  computed: mapState(['isAuth','username'])
}
</script>
