<template lang="html">
  <ul class='list-wrap'>
    <li class='item-wrap' v-for='pinpai in listData'>
      <span class='item-pinpai-brand'>{{pinpai.brand}}</span>
      <section class='item-xinghao-wrap'>
        <p v-for='xinghao in pinpai.xinghao' class='item-xinghao-box' >
          <span class='item-xinghao-model'>{{xinghao.model}}</span>
          <ol class='item-banben-wrap'>
            <li v-for='banben in xinghao.banben' class='item-banben-box'>
              <span class='item-banben-channel'>{{banben.buy_channel}}</span>
              <section class='item-price-box'>
                <p class='item-price-wrap' v-for='(price,key) in banben.price'>
                    <span class='item-price-key'>{{key}}</span>
                    <span class='item-price'>{{price}}</span>
                </p>
              </section>
            </li>
          </ol>
        </p>
      </section>
    </li>
  </ul>
</template>

<script>
// import {data} from '../api/mock.js'
export default {
  props: ['tablist'],
  data () {
    return {
      listData: this.tablist.length ? this.tablist : []
    }
  },
  watch: {
    tablist (newval) {
      this.listData = newval
    },
    deep: true
  },
  created () {
  }
}
</script>

<style lang="scss">
@mixin flexCenter {
  display: flex;
  align-items: center;
  flex-direction: row;
}
@mixin borderSet {
  border: 1px solid #EAEAEA;
  border-top: none;
}
.item-wrap{
  @include flexCenter();
  @include borderSet();
}
.item-pinpai-brand{
  display: inline-block;
  width: 20%;
  text-align: center;
}
.item-xinghao-wrap{
  width: 80%;
}
.item-xinghao-box{
  @include flexCenter();
  @include borderSet();
  border-right: none;
  &:last-child{
    border-bottom: none;
  }
}
.item-xinghao-model{
  display: inline-block;
  width: 25%;
  text-align: center;
}
.item-banben-wrap{
  width: 75%;
}
.item-banben-box{
  @include flexCenter();
  @include borderSet();
  border-right: none;
  &:last-child{
    border-bottom: none;
  }
}
.item-banben-channel{
  display: inline-block;
  width: 33.4%;
  text-align: center;
}
.item-price-box{
  width: 66.6%;
}
.item-price-wrap{
  @include flexCenter();
  width: 100%;
}
.item-price-key,.item-price{
  text-align: center;
  display: inline-block;
  width: 50%;
  padding: pxToRem(28px) 0;
  @include font-dpr(12px);
}
</style>
