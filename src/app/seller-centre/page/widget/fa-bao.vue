<template>
  <div class="fa">
    <div class="fa-title">
      <h3>涨单法宝</h3>
    </div>
    <ul class="fa-bao">
      <div class="fa-bao-item" v-for="(item,idx) in orderHelpers" :key="idx" @click="skip(item.url)">
        <div class="fa-bao-item-icon" v-lazy:background-image="item.icon"></div>
        <div class="fa-bao-item-title">
          <span>{{item.name}}</span>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  export default {
    props: ['orderHelpers'],
    methods: {
      skip (href) {
        native.skipToUrl({targetUrl: href})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fa{
    margin-top: pxToRem(20px);
    background-color: #fff;
    &-title{
      display: flex;
      padding: pxToRem(40px) pxToRem(30px) 0 pxToRem(30px);
      flex-direction: column;
      position: relative;
      &:before{
        width: pxToRem(5px);
        height: pxToRem(30px);
        content: '';
        position: absolute;
        left: 0;
        display: block;
        background-color: #ff5647;
      }
      h3{
        @include font-dpr(15px);
        font-weight: 500;
        line-height: 1;
        color: #404448;
      }
    }
    &-bao{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      flex-direction: row;
      padding: pxToRem(50px) 0 0 pxToRem(40px);
      &-item{
        width: pxToRem(135px);
        margin-right: pxToRem(40px);
        margin-bottom: pxToRem(40px);
        &-icon{
          width: pxToRem(85px);
          height: pxToRem(105px);
          margin: auto;
          background-size: cover;
          background-position: center;
        }
        &-title{
          @include font-dpr(13px);
          line-height: 1;
          color: #43474c;
          margin-top: pxToRem(38px);
          text-align: center;
        }
      }
    }
  }
</style>
