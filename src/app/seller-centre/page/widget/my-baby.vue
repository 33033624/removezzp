<template>
<div>
  <div class="goods" :class="{nomargin: isShare}">
    <div class="goods-title">
      <h3>{{isShare ? '在售宝贝' : '我的宝贝'}}</h3>
      <button v-if="!isShare" @click="publish"><span>发布</span></button>
    </div>
    <div class="goods-list" ref="tabTitle">
      <goods-item v-for="(item, idx) in goodsList" :goods="item" :key="idx"></goods-item>
    </div>
  </div>
  <div class="bottom-wrap" v-show="btnShow" v-if="!isShare && goodsList">
    <button class="bottom-btn" @click="click">{{btn}}</button>
  </div>
</div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  import {getCookie} from 'utils/cookiejs.js'
  export default {
    props: ['goodsList', 'isShare', 'showApply', 'isGoodMerchant'],
    data: () => ({
      btn: '一键分享所有宝贝',
      btnShow: false,
      top: '',
      uid: ''
    }),
    methods: {
      click () {
        native.shareClick({
          title: '好手机这里多的是',
          url: `http://m.zhuanzhuan.58.com/youpin/activities/seller/share?uid=${this.uid}`,
          content: '卖手机类～便宜又靠谱！不信你先瞅瞅！',
          picPath: 'http://img.58cdn.com.cn/youpin/yunying/upload_48a39a2ae59e2488050b380f1ff29c85.png'
        }, function (res) {
          if (res.code === '0') native.clickLog('share')
        })
      },
      publish () {
        native.in('zz') ? window.ZZAPP.enterPublish() : native.zzCaller.goPublish()
      }
    },
    mounted () {
      const PPU = getCookie('PPU')
      const name = 'UID'
      let reg = new RegExp(name + '=([^&]*)' + '(&|$)')
      let arr = PPU.match(reg)
      this.uid = arr ? decodeURI(arr[1]) : null
      this.$nextTick(function () {
        const _this = this
        this.tabTitle = this.$refs.tabTitle
        let top = this.tabTitle.offsetTop
        window.onscroll = function () {
          let wScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
          if (top < wScroll) {
            _this.btnShow = true
          } else {
            _this.btnShow = false
          }
        }
      })
    },
    computed: {
      // goodsListLength () {
      //   return this.goodsList.length || 0
      // }
    },
    components: {
      GoodsItem: require('./goods-item.vue')
    }
  }
</script>
<style lang="scss" scoped>
  .goods{
    margin-top: pxToRem(20px);
    margin-bottom: pxToRem(110px);
    background-color: #ffffff;
    &-title{
      height: pxToRem(110px);
      padding: pxToRem(40px) pxToRem(30px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      h3{
        @include font-dpr(15px);
        font-weight: 500;
        line-height: 1;
        color: #404448;
      }
      button{
        position: relative;
        width: pxToRem(106px);
        height: pxToRem(42px);
        border: none;
        background-color: #ff5647;
        @include font-dpr(13px);
        color: #FFF;
        border-radius: pxToRem(3px);
        display: flex;
        justify-items: center;
        justify-content: center;
        span{
          align-self: center;
        }
        &:before{
          content: '+';
          @include font-dpr(16px);
          margin-left: pxToRem(10px);
          line-height: 1;
          color: #FFF;
          align-self: flex-start;
        }
      }
    }
    &.nomargin{
      margin-bottom: pxToRem(20px);
    }
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
