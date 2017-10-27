<template>
  <div class="centre">
    <user-header :userInformation="userInfo" v-if="ajaxDone"></user-header>
    <strategy :notify="notify" v-if="notify"></strategy>
    <reward-punish :rewardInformation="rewardsAndPunishment" :sellersInCircle="sellersInCircle" v-if="ajaxDone && rewardsAndPunishment"></reward-punish>
    <fa-bao :orderHelpers="orderHelpers"></fa-bao>
    <activity :activityBanner="activityBanner" v-if="ajaxDone && activityBanner"></activity>
    <my-baby :goodsList="goodsList" :showApply="showApply" :isGoodMerchant="isGoodMerchant"></my-baby>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  import { getCompleteInfo } from '../api'
  export default {
    data: () => ({
      ajaxDone: false,
      userInfo: {},
      notify: '',
      sellersInCircle: '',
      orderHelpers: null,
      rewardsAndPunishment: null,
      activityBanner: null,
      goodsList: null,
      uid: null,
      showApply: '',
      isGoodMerchant: null
    }),
    created () {
      native.setTitle({title: '卖家中心'})
      native.setLog({page: 'seller-centre', pagetype: 'seller-centre'})
      if (!native.getUid()) {
        native.login(function () {
          console.log('回调 ')
        })
      }
      this.uid = native.getUid()
      getCompleteInfo()
        .then(res => {
          const {data} = res
          this.showApply = data.userInfo.statisticStatus
          this.isGoodMerchant = data.userInfo.isGoodMerchant
          this.ajaxDone = true
          Object.assign(this, data)
        })
    },
    methods: {
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
</style>
