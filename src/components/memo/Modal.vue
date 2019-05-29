<template>
  <article class="modal" :class="{'is-active': active}">
    <h2 class="a11y">메모입력</h2>
    <p>
      <textarea v-focus placeholder="내용" v-model="content"></textarea>
    </p>
    <div class="modal__btn-wrap">
      <button @click="add">저장</button>
      <button @click="cancel">취소</button>
    </div>
  </article>
</template>
<script>
import Config from '@/config/Config.memo'
export default {
  name: 'Modal',
  props: ['active'],
  data() {
    return {
      content: ''
    }
  },
  methods: {
    add() {
      this.$store.dispatch(Config.ADD, { memo: this.content })
      this.content = ''
      this.cancel()
    },
    cancel() {
      this.$emit('cancel')
    }
  },
  directives: {
    focus: {
      componentUpdated(el, binding) {
        el.focus()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 100%;
  left: 50%;
  z-index: 5;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: initial;
  transition: all 0.5s;

  p {
    width: 90%;
    margin: 2em auto;
  }

  textarea {
    width: 100%;
    height: 300px;
    padding: 1em;
    resize: none;
  }

  &__btn-wrap {
    // outline: 1px dashed red;
  }

  button {
    padding: 0.5em 1.2em;
    background-color: #fff;
    border: 0;
    border-radius: 0.3em;
    transition: all .13s;
    cursor: pointer;

    &:first-child {
      margin-right: 2em;
    }

    &:hover {
      @include box-shadow(
        '0 1px 1px 0 rgba(60, 64, 67, 0.08),
      0 1px 3px 1px rgba(60, 64, 67, 0.16)'
      );
    }
  }
}

.is-active {
  top: 50%;
}
</style>
