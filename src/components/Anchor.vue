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
  ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
  }

  li {
    width: 100%;
  }

  a {
    display: block;
    padding: 15px 0;
    color: #fff;
    text-decoration: none;
  }

  .router-link-exact-active {
    background-color: rgba(0, 0, 0, .5);
  }
</style>
