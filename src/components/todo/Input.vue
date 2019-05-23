<template>
  <p class="todo__input">
    <input v-model="text" type="text" placeholder="Input Text" @keyup.13="addTodo">
    <button @click="addTodo">추가하기</button>
  </p>
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
        alert('할일 입력 해!')
        return
      }
      this.$store.dispatch(Config.ADD, this.text)
      this.text = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.todo__input {
  position: relative;
  padding: em(10px);
}

[type='text'] {
  width: 100%;
  height: 50px;
  padding-left: em(20px);
  border: {
    style: solid;
    width: 0 0 1px 0;
    color: #ddd;
  }
  font-size: 2em;

  &:focus {
    outline: none;
  }
}

button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.75em;
  border: 0;
  background-color: #fff;
  color: #5a0050;
}
</style>
