<template>
  <section>
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
    Input, List
  }
}
</script>
<style lang="scss" scoped>

</style>
