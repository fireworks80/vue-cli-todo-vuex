<template>
  <section>
    <h2 class="a11y">memo</h2>
    <ul>
      <li v-for="(item, idx) in list" :key="idx">
        <strong>{{item.memo}}</strong>
        <time>{{item.date}}</time>
      </li>
    </ul>
  </section>
</template>
<script>
import Config from '@/config/Config.memo'
import {mapState} from 'vuex'
export default {
  name: 'MEMO',
  created() {
    this.$store.dispatch(Config.FETCH)
  },
  computed: {
    // memoList() {
    //   return this.$store.state.memos.memoList
    // }
    ...mapState({
      list: state => state.memos.memoList
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
