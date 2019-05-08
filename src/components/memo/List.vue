<template>
  <div class="pannel">
    <article
      @click="visibleMemo(item)"
      :class="{'show-active': item.visible}"
      class="memo"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <h3 class="memo__tit">{{item.memo | filterTitle}}</h3>
      <p class="memo__text">{{item.memo}}</p>
      <time>{{item.date}}</time>
    </article>
  </div>
</template>
<script>
import Config from '@/config/Config.memo'
import {mapState} from 'vuex'
export default {
  name: 'List',
  computed: mapState({
    list: state => state.memos.memoList
  }),
  methods: {
    visibleMemo(item) {
      const newItem = Object.assign(item);
      this.$store.dispatch(Config.VISIBLEMEMO, newItem)
    }
  },
  filters: {
    filterTitle(text) {
      const MAXTEXTLEN = 10
      return text.length > MAXTEXTLEN ? text.substr(0, MAXTEXTLEN) + '...' : text
    }
  }
}
</script>
<style lang="scss" scoped>
.pannel {
    display: flex;
    flex-wrap: wrap;
  }

  .memo {
    width: 33.33333%;
    height: 100%;
    padding: 20px 0;
    box-shadow: 0 0 2px rgba(0, 0, 0, .3);

    &__tit {
      margin: 0;
    }

    &__text {
      // outline: 1px dashed;
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: initial;

      @at-root .memo.show-active & {
        height: auto;
        white-space: normal;
        text-overflow: clip;
      }
    }

  }
</style>
