<template>
  <div id="app">
    <Header></Header>
    <Input></Input>
    <List></List>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Input from './components/Input'
import List from './components/List'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    Header,
    Input,
    List,
    Footer
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
