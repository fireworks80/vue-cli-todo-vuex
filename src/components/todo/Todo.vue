<template>
  <section class="todo-wrap">
    <div v-if="isAuth">
      <Input></Input>
      <List></List>
    </div>
    <p v-else>로그인 후 이용해 주세요</p>
  </section>
</template>
<script>
import {mapState} from 'vuex'
import Input from '@/components/todo/Input'
import List from '@/components/todo/List'
export default {
  name: 'Todo',
  components: {
    Input,
    List
  },
  computed: mapState(['isAuth']),
}
</script>
<style lang="scss" scoped>
.todo-wrap {
  @include box-shadow(0px 0px 5px 0px rgba(0, 0, 0, 0.1));
  background-color: #fff;
}
</style>
