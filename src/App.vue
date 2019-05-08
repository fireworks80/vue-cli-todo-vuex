<template>
  <div id="app">
    <Anchor></Anchor>
    <Header :title="title"></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Anchor from './components/Anchor'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Anchor,
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

<style>

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  color: #fff;
  background-color: #5a0050;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.a11y {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  opacity: 0;
}
</style>
