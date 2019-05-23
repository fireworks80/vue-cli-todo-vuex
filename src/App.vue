<template>
  <div id="app">
    <Menu></Menu>
    <Header :title="title"></Header>
    <router-view></router-view>
    <!--<Footer></Footer> -->
  </div>
</template>

<script>
import Menu from './components/Menu'
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Menu,
    Footer
  },
  computed: {
    title() {
      // console.log(this.$route.path)
      return this.$route.path === '/' ? 'TODO' : 'MEMO'
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
