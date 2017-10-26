<template lang="html">
  <div class='good-list-box'>
    <section class='good-list-box-top'>
      <img v-lazy="imgUrl" alt="" class='good-list-img'>
      <p class='good-list-text'>
        <span class='good-title'>{{getShangpin.infoTitle}}</span>
        <span class='good-price'>
          <i><b>￥</b>{{getShangpin.infoPrice}}</i>
          <i>活动报名价 <b>￥</b>{{getShangpin.actPrice}}</i>
        </span>
      </p>
      <span :class='["good-list-audit", `good-list-audit-${getShangpin.auditStatus}`]'></span>
    </section>
    <p class='good-list-box-bottom'>
      <span @click='change' v-if='getShangpin.auditStatus !== "2" && getShangpin.auditStatus !== "1" && getShangpin.ypCheckState !== 0'>商品编辑</span>
      <span @click='showReason' class='reason-button' v-if='getShangpin.auditStatus === "4" || getShangpin.auditStatus === "3" '>查看原因</span>
      <span v-if='getShangpin.auditStatus === "0"' class='reason-button' @click='appendActivity'>报名</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ['shangpin', 'k'],
  name: 'goodList',
  data () {
    return {
      getShangpin: {},
      imgUrl: ''
    }
  },
  created () {
    const path = Math.ceil(Math.random() * 6)
    this.getShangpin = this.shangpin
    this.imgUrl = `//zzpic${path}.58cdn.com.cn/zhuanzh/${this.getShangpin.infoPics}`
  },
  watch: {
    shangpin (newval) {
      const path = Math.ceil(Math.random() * 6)
      this.imgUrl = `//zzpic${path}.58cdn.com.cn/zhuanzh/${newval.infoPics}`
      this.$set(this, 'getShangpin', newval)
    },
    deep: true
  },
  methods: {
    change () {
      this.$emit('editPublish', this.getShangpin.infoId)
    },
    showReason () {
      this.$emit('reason', this.getShangpin)
    },
    appendActivity () {
      this.$emit('appendAct', this.getShangpin, this.k)
    }
  }
}
</script>

<style lang="scss">
.good-list-box{
  padding: pxToRem(32px) pxToRem(30px) pxToRem(20px) pxToRem(30px);
  background: white;
}
.good-list-box-top{
  display: flex;
  justify-content: center;
  padding-bottom: pxToRem(30px);
  border-bottom: 1px solid #eaeaea;
  & > *{
    display: inline-block;
  }
}
.good-list-img{
  display: inline-block;
  height: pxToRem(150px);
  width: pxToRem(150px);
}
.good-list-text{
  margin: 0 auto 0 pxToRem(20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .good-title{
    display: inline-block;
    width: 100%;
    @include font-dpr(14px);

  }
  .good-price{
    display: inline-block;
    width: 100%;
    &>i:nth-child(1){
      @include font-dpr(18px);
      color:#ff5647;
      b{
        @include font-dpr(12px);
      }
    }
    &>i:nth-child(2){
      @include font-dpr(14px);
      color:#fdb72d;
      b{
        @include font-dpr(10px);
      }
    }
  }
}
.good-list-audit{
  width: pxToRem(100px);
  height: pxToRem(100px);
  align-self: center;
  }
  $audit: 2, 3, 4;
  @each $i in $audit{
    .good-list-audit-#{$i}{
      background: url('../img/audit-#{$i}.png') no-repeat center;
      background-size: contain;
    }
  }
  .good-list-box-bottom{
    display: flex;
    justify-content: flex-end;
    margin-top: pxToRem(20px);
    & > span{
      display: inline-block;
      @include font-dpr(13px);
      padding: pxToRem(10px) pxToRem(20px);
      border: 1px solid #666666;
      margin-left: pxToRem(30px);
      border-radius: pxToRem(3px);
      color:#666666;
    }
    .reason-button{
      background: #ff5647;
      color: #fff;
      border: none;
    }
  }
</style>
