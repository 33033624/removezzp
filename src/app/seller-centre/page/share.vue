<template>
  <div class="centre">
    <user-header :userInformation="userInfo" :isShare="true"></user-header>
    <my-baby :goodsList="goodsList" :isShare="true"></my-baby>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  import {getUrlParameter} from 'utils/common.js'
  import { getSharedInfo } from '../api'
  const uid = getUrlParameter('uid')
  export default {
    data: () => ({
      btn: '一键分享所有宝贝',
      ajaxDone: false,
      userInfo: {},
      goodsList: null
    }),
    created () {
      native.setTitle({title: '卖家中心分享页'})
      native.setLog({page: 'seller-share', pagetype: 'seller-share'})
      getSharedInfo(uid)
        .then(res => {
          const {data} = res
          Object.assign(this, data)
        })
      native.share({
        title: '好手机这里多的是',
        url: `http://m.zhuanzhuan.58.com/youpin/activities/seller/share?uid=${uid}`,
        content: '卖手机类～便宜又靠谱！不信你先瞅瞅！',
        picPath: 'http://img.58cdn.com.cn/youpin/yunying/upload_48a39a2ae59e2488050b380f1ff29c85.png'
      }, function (res) {
        if (res.code === '0') native.clickLog('share')
      })
    },
    components: {
      UserHeader: require('./widget/header.vue'),
      strategy: require('./widget/strategy.vue'),
      RewardPunish: require('./widget/reward-punish.vue'),
      FaBao: require('./widget/fa-bao.vue'),
      activity: require('./widget/activity.vue'),
      MyBaby: require('./widget/my-baby.vue')
    }
  }
</script>
<style lang="scss" scoped>
  .centre{
    background-color: #f2f3f6;
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
