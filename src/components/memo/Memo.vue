<template>
  <section>
    <h2 class="a11y">memo</h2>
    <List></List>
    <Modal :active="isShow" @cancel="toggleModal"></Modal>
    <button class="btn-memo" type="button" @click="toggleModal">+</button>
  </section>
</template>
<script>
import Config from '@/config/Config.memo'
import List from '@/components/memo/List'
import Modal from '@/components/memo/Modal'
export default {
  name: 'MEMO',
  components: { List, Modal },
  data() {
    return {
      isShow: false
    }
  },
  created() {
    this.$store.dispatch(Config.FETCH)
  },
  methods: {
    toggleModal() {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="scss" scoped>
  .btn-memo {
    @include box-shadow;
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    transition: background-color .43s;

    &:hover {
      background-color: #969696;
      color: #fff;
    }
  }
</style>
