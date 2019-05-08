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
    margin: 0;
    padding: 2em 0;
  }
</style>
