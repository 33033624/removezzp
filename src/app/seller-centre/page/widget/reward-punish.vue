<template>
  <div class="reward">
    <div class="reward-title">
      <h3>手机卖家奖罚公告栏</h3>
      <span>{{sellersInCircle}}位手机卖家在圈内</span>
    </div>
    <div class="reward-wai">
    <Slide-up>
      <div class="reward-item" :key="nowReward.nickname">
          <div class="reward-item-img" v-lazy:background-image="nowReward.portrait"></div>
          <div class="reward-item-content">
            <div class="reward-item-content-name">{{nowReward.nickname}}</div>
            <div class="reward-item-content-say"
            v-html="nowReward.content.replace(/[\u0391-\uFFE5]{4}$/ , `<span style='color: red;'>$&</span>`)">
            </div>
          </div>
      </div>
    </Slide-up>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['rewardInformation', 'sellersInCircle'],
    data: () => ({
      current: 0
    }),
    computed: {
      nowReward () {
        return this.rewardInformation[this.current] || {}
      },
      list () {
        let res = []
        res.push(this.compData[this.listIndex])
        this.listIndex === this.len - 1 ? res.push(this.compData[0]) : res.push(this.compData[this.listIndex + 1])
        return res
      }
    },
    mounted () {
      if (this.rewardInformation.length > 0) this.init()
    },
    watch: {
      rewardInformation (v) {
        if (this.rewardInformation.length > 0) this.init()
      }
    },
    methods: {
      init () {
        const { length } = this.rewardInformation
        window.setInterval(() => (this.current = (++this.current % length)), 4000)
      }
    },
    components: {
      SlideUp: require('./slide-up')
    }
  }
</script>
<style lang="scss" scoped>
  .reward{
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
      span{
        margin-top: pxToRem(10px);
        @include font-dpr(10px);
        line-height: 1;
        color: #b4b8c2;
      }
    }
    &-item{
      display: flex;
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      align-items: center;
      justify-content: start;
      padding: pxToRem(50px) pxToRem(30px);
      &-img{
        width: pxToRem(80px);
        height: pxToRem(80px);
        background-size: cover;
        border-radius: pxToRem(40px);
      }
      &-content{
        margin-left: pxToRem(25px);
        flex: 1;
        overflow: hidden;
        &-name{
          @include font-dpr(15px);
          line-height: 1;
          color: #404448;
        }
        &-say{
          @include font-dpr(12px);
          line-height: 1;
          margin-top: pxToRem(15px);
          color: #b4b8c2;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .reward-wai{
    height: pxToRem(180px);
    transform: translate3d(0,0,0);
    overflow: hidden;
    position: relative;
  }

</style>
