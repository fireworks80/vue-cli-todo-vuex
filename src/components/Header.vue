<template>
  <h1>{{title}}</h1>
</template>
<script>
export default {
  name: 'Header',
  props: ['title']
}
</script>
<style lang="scss" scoped>
  h1 {
    margin-bottom: em(30px);
  }
</style>
