<template>
  <div id="app">
    <Menu></Menu>
    <Header :title="title"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu'
import Header from './components/Header'

export default {
  name: 'app',
  components: {
    Header,
    Menu
  },
  computed: {
    title() {
      const currentPath = this.$route.path.substr(1)

      return currentPath ? currentPath.toUpperCase() : 'HOME'
    }
  }
}
</script>

<style lang="scss">
$font-primary: 16px;
$font-current: 10px;


html {
  font-size: ($font-current / $font-primary * 100%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f6f8f9;
}

ul {
  list-style: none;
}

#app {
  // outline: 1px dashed;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 720px;
  padding: {
    left: 10px;
    right: 10px;
  }
  margin: {
    top: em(100px);
    left: auto;
    right: auto;
  }
  font-size: 1.6rem;
}

.a11y {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  opacity: 0;
}
</style>
