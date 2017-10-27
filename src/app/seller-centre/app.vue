<template>
  <div class="body">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import native from '@zz-yp/native-adapter'
  import VueLazyload from 'vue-lazyload'
  import Hint from './page/hint'

  Vue.use(VueLazyload, {
    preLoad: 1,
    attempt: 1
  })
  Vue.prototype.$hint = Hint
  export default{
    created () {
      native.setTitle({
        title: '卖家中心'
      })
    }
  }
</script>

<style lang="scss">
</style>
