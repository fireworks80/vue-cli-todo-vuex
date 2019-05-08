<template>
  <section>
    <h2 class="a11y">memo</h2>
    <List></List>
    <button type="button" @click="visibleModal">+</button>
    <article class="modal" :class="{'is-active': isModalShow}">
      <h2>모달</h2>
      <p><textarea name="" id="" cols="30" rows="10" placeholder="내용" v-model="content"></textarea></p>
      <button @click="addMemo">저장</button>
    </article>
  </section>
</template>
<script>
import Config from '@/config/Config.memo'
import List from '@/components/memo/List'
export default {
  name: 'MEMO',
  components: { List },
  data() {
    return {
      isModalShow: false,
      content: ''
    }
  },
  created() {
    this.$store.dispatch(Config.FETCH)
  },
  methods: {
    visibleModal() {
      this.isModalShow = !this.isModalShow
    },
    addMemo() {
      this.$store.dispatch(Config.ADD, {memo: this.content})
      this.visibleModal();
    }
  }
}
</script>
<style lang="scss" scoped>


  .modal {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    max-width: 600px;
    width: 100%;
    background-color: #fff;
    color: initial;
    border: 1px solid red;
  }

  .is-active {
    display: block;
  }
</style>
