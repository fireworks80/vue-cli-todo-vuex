<template>
  <nav>
    <ul>
      <li v-for="(link, idx) in links" :key="idx">
        <router-link :to="link.path">{{link.name}}</router-link>
      </li>
    </ul>
  </nav>
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

$color-hover-border: #42bcf6;
$color-primary: #b9b9b9;
$color-hover: #7b7b7b;

nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: em(50px);
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  -webkit-box-shadow: 0px 10px 5px -8px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 10px 5px -8px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 10px 5px -8px rgba(0, 0, 0, 0.16);
}
ul {
  display: inline-flex;
}

li:nth-child(n + 2) {
  margin-left: em(20px);
}

a {
  position: relative;
  display: block;
  padding: 10px 0 5px;
  color: $color-primary;
  text-decoration: none;

  &:hover,
  &.router-link-exact-active {
    color: $color-hover;
  }

  &.router-link-exact-active {
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: $color-hover-border;
    }
  }
}
</style>
