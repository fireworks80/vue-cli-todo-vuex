<template>
  <section>
    <div v-if="isAuth">
      <h2 class="a11y">memo</h2>
      <List></List>
      <Modal :active="isShow" @cancel="toggleModal"></Modal>
      <button class="btn-memo" type="button" @click="toggleModal">+</button>
    </div>
    <p v-else>로그인 후 이용해 주세요</p>
  </section>
</template>
<script>
import {mapState} from 'vuex'
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
  computed: mapState(['isAuth']),
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
