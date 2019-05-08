<template>
  <section>
    <h2 class="a11y">Input</h2>
    <p><input v-model="text" type="text" placeholder="Input Text" @keyup.13="addTodo"><button @click="addTodo">추가하기</button></p>
  </section>
</template>
<script>
import Config from '@/config/Config.todo'
export default {
  name: 'Search',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    addTodo() {
      if (!this.text) {
        alert('할일 입력 해!');
        return;
      }
      this.$store.dispatch(Config.ADD, this.text)
      this.text = '';
    }
  }
}
</script>
<style lang="scss" scoped>
  p {
    // outline: 1px dashed #fff;
    position: relative;
    padding: 0 10px;
  }

  [type="text"] {
    width: 100%;
    height: 50px;
    padding-left: 20px;
    border: 0;
    font-size: 2em;
  }

  button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    padding: .75em;
    border: 1px solid #5a0050;
    border-radius: 5px;
    background-color: #fff;
    color: #5a0050;
  }
</style>
