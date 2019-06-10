<template>
  <div>
    <p v-if="isAuth">안녕하세요! {{username}}</p>
    <p v-else>로그인 후 이용해 주세요</p>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'MyPage',
  computed: mapState(['isAuth', 'username']),
}
</script>
