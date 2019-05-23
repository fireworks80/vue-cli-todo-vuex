<template>
  <ul class="todo__list">
    <li class="todo__item" v-for="item in list" :key="item.id" :class="{'editing' : editedTodo === item}">
      <p>
        <input class="todo__check" type="checkbox" :checked="item.done" @change="toggleDone(item)">
        <label @dblclick=editTodoView(item) class="todo__text" :class="{'done': item.done}">{{item.todo}}</label>
        <button type="button" class="todo__del" @click="delTodo(item.id)"><span class="a11y">삭제</span></button>
      </p>
      <input v-todo-focus="item === editedTodo" @blur="doneEdit(item)" @keyup.esc="cancelEdit()" type="text" v-model="editText" class="todo__edit-field">
    </li>
  </ul>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Config from '@/config/Config.todo'
export default {
  name: 'List',
  data() {
    return {
      editText: '',
      editedTodo: null
    }
  },
  created() {
    this.$store.dispatch(Config.FETCH)
  },
  computed: mapState({
    list: state => state.todos.todolist
  }),
  methods: {
    editTodoView(item) {
      this.editedTodo = item
      this.editText = item.todo
    },
    cancelEdit() {
      this.editedTodo = null;
    },
    doneEdit(item) {
      // debugger;
      if (!this.editedTodo) return;

      if (this.editText !== item.todo) {
        this.$store.dispatch(Config.UPDATE, {...item, todo: this.editText});
      }

      this.cancelEdit()
    },
    toggleDone(item) {
      this.$store.dispatch(Config.UPDATE, {...item, done: !item.done})
    },
    ...mapActions([Config.DELETE])
  },
  directives: {
    'todo-focus'(el, binding) {
      if (binding.value) el.focus();
    }
  }
}
</script>
<style lang="scss" scoped>
$size: 30px;

.todo__list {
  list-style: none;
  margin: 0;
  font-size: em(20px);
}

.todo__item {
  border-bottom: 1px solid #ddd;
  text-align: initial;

  p {
    position: relative;
  }

  &:hover .todo__del {
    opacity: 1;
  }
}

.todo__check {
  position: absolute;
  left: em(12px);
  top: em(12px);
  z-index: 5;
  width: em(50px);
  height: em(50px);
  -webkit-appearance: none;
  appearance: none;
  outline: none;

  &:checked {
    outline: none;

    & + .todo__text::after {
      opacity: 1;
    }
  }
}

.todo__text {

  display: block;
  padding: em(15px) em(40px) em(15px) em(60px);

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: em(10px);
    top: 50%;
    transform: translateY(-50%);
    width: em($size);
    height: em($size);
  }

  &::before {
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }

  &::after {
    content: 'V';
    text-align: center;
    line-height: $size;
    opacity: 0;
  }

  &.done {
    text-decoration: line-through;
    color: #ddd;
  }
}

.todo__del {
  position: absolute;
  right: em(40px);
  top: 50%;
  width: em(20px);
  height: em(20px);
  transform: translateY(-50%);
  background: none;
  border: 0;
  opacity: 0;
  transition: opacity .5s;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: em(1px);
    background-color: #959595;
  }

  &::before {
    transform: rotate(-45deg);
  }

  &::after {
    transform: rotate(45deg);
  }
}

.todo__edit-field {
  display: none;
  margin-left: em(60px);
  padding: em(13px) 0;
  // line-height: 1.2;
  font-size: inherit;
}

.editing p {
  display: none;
}

.editing .todo__edit-field {
  display: block;
}


.is-done {
  color: red;
}

</style>
