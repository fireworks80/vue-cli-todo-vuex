<template>
  <div class="pannel">
    <article
      @click="visibleMemo(item)"
      :class="{'show-active': item.visible}"
      class="memo"
      v-for="(item, idx) in list"
      :key="idx"
    >
      <h3 v-if="!item.visible" class="memo__tit">{{item.memo | filterTitle}}</h3>
      <p v-else class="memo__text">{{item.memo}}</p>
      <time>{{item.date}}</time>
    </article>
  </div>
</template>
<script>
import Config from '@/config/Config.memo'
import { mapState } from 'vuex'
export default {
  name: 'List',
  computed: mapState({
    list: state => state.memos.memoList
  }),
  methods: {
    visibleMemo(item) {
      this.$store.dispatch(Config.UPDATE, Object.assign(item))
    }
  },
  filters: {
    filterTitle(text) {
      const MAXTEXTLEN = 10
      return text.length > MAXTEXTLEN
        ? text.substr(0, MAXTEXTLEN) + '...'
        : text
    }
  }
}
</script>
<style lang="scss" scoped>
.pannel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.memo {
  width: 33.33333%;
  height: 100%;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  background-color: #40093a;
  line-height: 1.4;

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
  }

  &.show-active {
    position: relative;

    time {
      position: absolute;
      top: 10px;
      right: 10px;
    }

    .memo__text {
      height: auto;
      white-space: normal;
      text-overflow: clip;
    }
  }
}
</style>
