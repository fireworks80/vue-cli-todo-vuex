<template>
  <ul>
    <li @click.self="toggleDone(item)" v-for="item in todolist" :key="item.id">
      <p v-if="item.edit">
        <input type="text" v-model="text" :placeholder="item.todo">
        <span class="btn-wrap">
          <button @click.stop="editTodo(item.id)" class="button">수정완료</button>
        </span>
      </p>
      <p v-else>
        <del v-if="item.done" :class="{'is-done': item.done}">{{ item.todo }}</del>
        <span v-else>{{ item.todo }}</span>
        <span class="btn-wrap">
          <button @click.stop="editTodoForm(item.id)" type="button">수정</button>
          <button @click.stop="delTodo(item.id)" type="button">삭제</button>
        </span>
      </p>
    </li>
  </ul>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Config from '@/Config'
export default {
  name: 'List',
  data() {
    return {
      text: ''
    }
  },
  created() {
    this.$store.dispatch(Config.INIT)
  },
  computed: mapGetters([Config.GETLIST]),
  methods: {
    editTodo(id) {
      this.$store.dispatch(Config.EDIT, { text: this.text, id })
      this.text = ''
    },
    ...mapActions([Config.TOGGLE, Config.DEL]),
    ...mapMutations([Config.EDITFORM])
  }
}
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 2em;
}

p {
  margin: 0;
}

li {
  position: relative;
  padding: 2em;
  margin-bottom: .5em;
  cursor: pointer;
  background-color: #730362;
  text-align: initial;
}
.is-done {
  color: red;
}

.btn-wrap {
  position: absolute;
  right: 2em;
  top: 50%;
  transform: translateY(-50%);
}
</style>
