<template>
  <div>
    <article
      :class="{'show-active': currentMemo === item}"
      class="memo"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <div @click="visibleMemo(item)">
        <h3 v-if="currentMemo !== item">{{item.memo | filterTitle}}</h3>
        <textarea class="memo__text" v-else v-model="editText" @blur="doneMemo(item)" v-focus></textarea>
      </div>
      <div class="memo__btn-wrap" v-if="currentMemo">
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
      currentMemo: null,
      editText: null
    }
  },
  computed: mapState({
    list: state => state.memos.memoList
  }),
  methods: {
    visibleMemo(item) {
      this.currentMemo = item;
      this.editText = item.memo;
    },
    hideMemo() {
      this.currentMemo = null;
    },
    doneMemo(item) {
      this.hideMemo();
      if (this.editText === item.memo) return;

      this.$store.dispatch(Config.UPDATE, {...item, memo: this.editText});

    }
  },
  filters: {
    filterTitle(text) {
      const MAXTEXTLEN = 10
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
  margin: 10px;
  padding: .5em;
  background-color: #fff;
  line-height: 1.4;
  text-align: initial;

  $this: &;

  &__text {
    // outline: 1px dashed;
    height: 20px;
    overflow: hidden;
    resize: none;
  }

  &.show-active {
    position: relative;

    .memo__text {
      min-height: 30px;
      width: 100%;
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
