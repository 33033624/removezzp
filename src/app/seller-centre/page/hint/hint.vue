<template>
  <div class="hint" v-show="visible" :style="{ top: top + 'px', left: left + 'px' }" ref="hint">
     <span class="hint-text">{{ message }}</span>
  </div>
</template>
<script>
  export default{
    name: 'hint',
    props: {
      message: String,
      clientX: Number,
      clientY: Number
    },
    data () {
      return {
        visible: false,
        top: 0,
        left: 0,
        hint: null
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.hint = this.$refs.hint
        this.left = this.clientX
        this.top = this.clientY
      })
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .hint{
    position: fixed;
    top: pxToRem(30px);
    left: 50%;
    padding: pxToRem(30px);
    background-color: #000000;
    opacity: 0.7;
    max-width: pxToRem(250px);
    border-radius: pxToRem(3px);
    transform: translate(-50%, -115%);
    &:after{
      content: "";
      border-left: pxToRem(15px) solid transparent;
      border-right: pxToRem(15px) solid transparent;
      border-top: pxToRem(15px) solid #000000;
      transform: translate(-50%, -50%);
      position: absolute;
      bottom: pxToRem(-15px);
      left: 50%;
    }
    &-text{
      @include font-dpr(12px);
      text-align: left;
      color: #ffffff;
    }
  }
</style>
