<template>
  <div>
    <article
      :class="{'is-active': current === item}"
      class="memo"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <div @click="visibleMemo(item)">
        <h3 v-if="current !== item">{{item.memo | filterTitle}}</h3>
        <textarea class="memo__text" v-else v-model="editText" @blur="doneMemo(item)" v-focus></textarea>
        <time class="memo__prev-time">{{item.date}}</time>
      </div>
      <div class="memo__btn-wrap" v-if="current === item">
        <time>{{item.date}}</time>
        <button class="memo__close" type="button" @click="doneMemo(item)">닫기</button>
      </div>
    </article>
  </div>
</template>
<script>
import Config from '@/config/Config.memo'
import { mapState } from 'vuex'
export default {
  name: 'List',
  data() {
    return {
      current: null,
      editText: null
    }
  },
  computed: mapState({
    list: state => state.memos.memoList
  }),
  methods: {
    visibleMemo(item) {
      this.current = item;
      this.editText = item.memo;
    },
    hideMemo() {
      this.current = null;
    },
    doneMemo(item) {
      this.hideMemo();
      if (this.editText === item.memo) return;

      this.$store.dispatch(Config.UPDATE, {...item, memo: this.editText});

    }
  },
  filters: {
    filterTitle(text) {
      const MAXTEXTLEN = 30
      return text.length > MAXTEXTLEN
        ? text.substr(0, MAXTEXTLEN) + '...'
        : text
    }
  },
  directives: {
    focus: {
      'inserted'(el, binding) {
        el.focus()
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.memo {
  @include box-shadow(0px 0px 5px 0px rgba(0, 0, 0, 0.1));
  position: relative;
  padding: .5em;
  border-radius: .3em;
  background-color: #fff;
  line-height: 1.4;
  text-align: initial;
  transition: all .45s;

  $this: &;

  &__text {
    // outline: 1px dashed;
    width: 100%;
    min-height: 20px;
    resize: none;
  }

  &.is-active {
    position: relative;
    z-index: 5;
  }

  &__prev-time {
    position: absolute;
    right: 1em;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
    transition: opacity .45s;

    #{$this}:hover & {
      opacity: 1;
    }

    #{$this}.is-active & {
      display: none;
    }
  }

  &__btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__close {
    padding: .5em;
    border: 1px solid #ddd;
    background-color: transparent;
    cursor: pointer;
  }
}
</style>
