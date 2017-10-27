<template>
  <div class="body">
    <router-view></router-view>
    <div class="bottom-block"></div>
    <div class="bottom-wrap">
      <button class="bottom-btn" @click="click">{{btn}}</button>
    </div>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  native.setTitle({
    title: '手机好卖家'
  })
  export default {
    data: () => ({
      btn: '申请',
      btnCb: void 0
    }),
    created () {
      this.$root.btn = this
    },
    methods: {
      click () {
        this.btnCb && this.btnCb()
      },
      setBtn (btn, btnCb) {
        this.btn = btn
        this.btnCb = btnCb
      }
    }
  }
</script>

<style lang="scss">
  .bottom-block {
    height: pxToRem(100px);
    width: 100%;
  }
  .bottom-wrap {
    position: fixed;
    padding: pxToRem(10px) pxToRem(20px) ;
    bottom: 0;
    width: 100%;
    height: pxToRem(100px);
    box-sizing: border-box;
    border-top: 1px solid #e3e3e3;
    background: #fff;
  }
  .bottom-btn {
    @include font-dpr(16px);
    color: #fff;
    height: 100%;
    width: 100%;
    background: #ff5647;
    border: none;
  }
</style>
