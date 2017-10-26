<template lang="html">
  <p class='caption-box'>
    <span v-for='item in captions' class='caption-item'>{{item}}</span>
  </p>
</template>

<script>
export default {
  data () {
    return {
      captions: [
        '品牌',
        '型号',
        '版本',
        '内存',
        '价格要求'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.caption-box{
  width: 100%;
  display: flex;
  justify-content: center;
}
.caption-item{
  display: inline-block;
  text-align: center;
  width: 20%;
  padding: pxToRem(20px) pxToRem(18px);
  color:#fff;
  background-color: #9da0a9;
  @include font-dpr(12px);
}
</style>
