<template>
  <ul>
    <li @click.self="toggle(item)" v-for="item in list" :key="item.id">
      <p v-if="item.edit">
        <input type="text" v-model="text" ref="newText" :placeholder="item.todo" :data-todo="item.todo">
        <span class="btn-wrap">
          <button @click.stop="editTodo(item.id)" class="button">수정완료</button>
        </span>
      </p>
      <p v-else @click="toggle(item)">
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
import { mapState, mapMutations, mapActions } from 'vuex'
import Config from '@/config/Config.todo'
export default {
  name: 'List',
  data() {
    return {
      text: ''
    }
  },
  created() {
    this.$store.dispatch(Config.FETCH)
  },
  computed: mapState({
    list: state => state.todos.todolist
  }),
  methods: {
    editTodo(id) {
      const input = this.$refs.newText;
      this.$store.dispatch(Config.UPDATE, { todo: this.text || input[0].dataset.todo, id })
      this.text = ''
    },
    toggle(todo) {
      this.$store.dispatch(Config.TOGGLE, {id: todo.id, done: !todo.done})
    },
    ...mapActions([Config.DELETE]),
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
