<template>
  <section class="todo-wrap">
    <Input></Input>
    <List></List>
  </section>
</template>
<script>
import Input from '@/components/todo/Input'
import List from '@/components/todo/List'
export default {
  name: 'Todo',
  components: {
    Input,
    List
  }
}
</script>
<style lang="scss" scoped>
.todo-wrap {
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
}
</style>
