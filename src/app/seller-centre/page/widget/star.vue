<template>
  <div class="star">
    <div class="star-share" v-if="isShare">
      <span>买家评价</span>
    </div>
    <div class="star-item">
      <div class="star-item-star" v-for="i in 5" v-lazy:background-image="getStar(i)"></div>
    </div>
    <div class="star-mark">{{starNmuber}}分<i v-if="!isShare" @click="hint"></i></div>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  export default {
    props: ['starNmuber', 'isShare'],
    data: () => ({
      starFill: require('../../img/starFill.png'),
      starEmpty: require('../../img/starEmpty.png'),
      starHalf: require('../../img/starHalf.png')
    }),
    computed: {
    },
    methods: {
      skipToUrl () {
        native.skipToUrl({targetUrl: '123'})
      },
      hint (e) {
        this.$hint({message: '所有订单的综合好评分', clientX: e.clientX, clientY: e.clientY})
      },
      getStar (i) {
        let toInt = parseFloat(this.starNmuber)
        const starInteger = Math.ceil(this.starNmuber)
        if (i === toInt || i < starInteger) {
          return this.starFill
        } else if (i > starInteger) {
          return this.starEmpty
        } else {
          return this.starHalf
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .star{
    display: flex;
    align-items: center;
    margin-top: pxToRem(60px);
    &-share{
      @include font-dpr(13px);
      line-height: 1.08;
      color: #43474c;
      margin-right: pxToRem(20px);
    }
    &-item{
      display: flex;
      &-star{
        width: pxToRem(30px);
        height: pxToRem(30px);
        margin-right: pxToRem(10px);
        background-size: cover;
      }
    }
    &-mark{
      @include font-dpr(13px);
      line-height: 1.08;
      color: #404448;
      display: flex;
      align-items: center;
      i{
        width: pxToRem(26px);
        height: pxToRem(26px);
        display: block;
        background-image: url(../../img/question.png);
        background-size: cover;
        margin-left: pxToRem(10px);
      }
    }
    &-evaluate{
      margin-left: pxToRem(60px);
      @include font-dpr(13px);
      line-height: 1.08;
      text-align: left;
      color: #6da5ff;
    }
  }
</style>
