<template>
  <div class="strategy" @click="click">
    <i></i>
    <span>{{notify}}</span>
  </div>
</template>

<script>
  export default {
    props: ['notify'],
    methods: {
      click () {
        console.log('跳转')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .strategy{
    width: pxToRem(750px);
    background-color: #fff;
    margin-top: pxToRem(20px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: pxToRem(30px) pxToRem(30px);
    i{
      width: pxToRem(20px);
      height: pxToRem(38px);
      display: block;
      margin-right: pxToRem(30px);
      background-image: url(../../img/gonggao.png);
      background-size: cover;
    }
    span{
      @include font-dpr(14px);
      line-height: 1.36;
      flex: 1;
      color: #6da5ff;
    }
  }
</style>
