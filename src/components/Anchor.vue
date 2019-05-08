<template>
  <ul>
    <li v-for="(link, idx) in links" :key="idx"><router-link :to="link.path">{{link.name}}</router-link></li>
  </ul>
</template>
<script>
import anchors from '@/routes'
export default {
  name: 'Anchor',
  data() {
    return {
      links: anchors
    }
  }
}
</script>
<style lang="scss" scoped>
  a {
    color: #fff;
  }
</style>
