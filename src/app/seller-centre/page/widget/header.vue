<template>
  <div class="header">
    <div class="header-bg" v-lazy:background-image="bgImg"></div>
    <div class="user">
    <div class="user-avatar-background" :class="{isGoodMerchant: isGoodMerchant}">
      <div class="user-avatar" v-lazy:background-image="portrait">
        <i class="crown" v-if="isGoodMerchant"></i>
        <button v-if="isShare" @click="attention"><span>关注</span></button>
      </div>
    </div>
      <div class="user-name">{{nickname}}</div>
      <div class="user-label" v-if="labels">
        <img v-for="(label,idx) in labels" :key="idx" v-lazy="label">
      </div>
      <div class="user-data" :class="[{apply: !isShowData}, isShowData ? 'process' : 'succeed']">
        <div class="user-data-title" v-if="!isShare">
          <i></i>
          <span>我的买卖手机数据</span>
          <span v-if="isShowData">数据不含今日新增，每日04:00更新</span>
        </div>
        <div class="user-data-apply" v-if="!isShowData && !isShare">
          <div class="user-data-apply-title">
            <span>这里将会展示您每天的手机交易数量，帮助您及时了解自己的运营情况</span>
          </div>
          <div class="user-data-apply-field">
            <span v-for="(item,idx) in userField">{{`· ${item}`}}</span>
          </div>
          <div class="user-data-apply-result" v-if="statisticStatus === 1">
            <span>申请成功！明天将会展示数据</span>
          </div>
          <div class="user-data-apply-button" v-if="statisticStatus === 0">
            <button @click="apply"><i></i><span>申请展示</span></button>
          </div>
        </div>
        <div class="user-data-show" v-if="isShowData">
          <div class="user-data-show-item">
            <h3>{{totalSoldCount}}</h3>
            <span>累计售出<i @click="hint($event, 1)"></i></span>
          </div>
          <div class="user-data-show-item">
            <h3>{{recentSoldCount}}</h3>
            <span>近期交易<i @click="hint($event, 2)"></i></span>
          </div>
          <div class="user-data-show-item">
            <h3>{{onSaleCount}}</h3>
            <span>在架商品<i @click="hint($event, 3)"></i></span>
          </div>
          <div class="user-data-show-item">
            <h3>{{fansCount}}</h3>
            <span>累计粉丝</span>
          </div>
        </div>
        <div class="user-data-star" v-if="isShowData">
          <star :starNmuber="compositeScore" :isShare="isShare"></star>
        </div>
        <div class="user-data-pre" v-if="isShowData && !isShare">
          <div class="user-data-pre-item">
            <div class="user-data-pre-item-name">
              <span>交易成功率<i @click="hint($event, 4)"></i></span>
            </div>
            <div class="user-data-pre-item-progress">
              <div class="progress-bar">
                <div class="progress-bar-residue" :style="getProgressPrecent(successTransRate)"></div>
              </div>
            </div>
            <span>{{successTransRate}}%</span>
          </div>
          <div class="user-data-pre-item">
            <div class="user-data-pre-item-name">
              <span>验机订单比例<i @click="hint($event, 5)"></i></span>
            </div>
            <div class="user-data-pre-item-progress">
              <div class="progress-bar">
                <div class="progress-bar-residue" :style="getProgressPrecent(inspectOrderRate)"></div>
              </div>
            </div>
            <span>{{inspectOrderRate}}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { applyTradeData } from '../../api'
  import {getUrlParameter} from 'utils/common.js'
  const uid = getUrlParameter('uid')
  export default {
    props: ['userInformation', 'isShare'],
    data: () => ({
      btn: '一键分享所有宝贝',
      isGoodMerchant: '',
      portrait: '',
      nickname: '',
      labels: null,
      grade: '',
      statisticStatus: '',
      totalSoldCount: '',
      recentSoldCount: '',
      onSaleCount: '',
      fansCount: '',
      isFistShow: false,
      compositeScore: '',
      successTransRate: '',
      inspectOrderRate: '',
      userField: [
        '累计售出',
        '近期交易',
        '在架商品',
        '累计粉丝',
        '平均好评分',
        '交易成功率',
        '验机订单比例'
      ]
    }),
    watch: {
      userInformation (v) {
        Object.assign(this, v)
      }
    },
    created () {
      Object.assign(this, this.userInformation)
    },
    computed: {
      bgImg () {
        return this.isGoodMerchant ? require('../../img/goodSeller.png') : require('../../img/simpleSeller.png')
      },
      isShowData () {
        if (this.statisticStatus === 2) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      getProgressPrecent (pre) {
        return {width: `${pre}%`}
      },
      apply () {
        applyTradeData().then(data => {
          const {success} = data
          if (success) {
            this.statisticStatus = 1
          }
        })
      },
      attention () {
        window.location.href = `zhuanzhuan://jump/core/personHome/jump?uid=${uid}`
      },
      hint (e, idx) {
        const options = {}
        options.clientX = e.clientX
        options.clientY = e.clientY
        switch (idx) {
          case 1:
            options.message = '历史成功卖出的手机台数总计（支持验机服务）'
            break
          case 2:
            options.message = '近30天成功卖出的手机台数（支持验机服务）'
            break
          case 3:
            options.message = '在售宝贝数量（审核成功数量）'
            break
          case 4:
            options.message = '历史所有订单中，已产生发货行为且交易关闭的订单中，成功售出的订单占比 '
            break
          case 5:
            options.message = '近30天成功交易卖出的手机订单中验机的订单占比'
            break
        }
        this.$hint(options)
      }
    },
    components: {
      star: require('./star.vue')
    }
  }
</script>
<style lang="scss" scoped>
  .header{
    background-color: #fff;
  }
  .header-bg{
    width: 100%;
    height: pxToRem(210px);
    background-size: cover;
  }
  .user{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: pxToRem(-130px);
    flex-direction: column;
    &-avatar-background{
      background-image: linear-gradient(134deg, #70fffa, #8a82e3);
      width: pxToRem(185px);
      height: pxToRem(185px);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      &.isGoodMerchant{
        background-image: linear-gradient(134deg, #ffe9c4, #e2b270);
      }
    }
    &-avatar{
      width: pxToRem(180px);
      height: pxToRem(180px);
      position: relative;
      background-size: contain;
      background-position: center;
      background-color: #d8d8d8;
      border-radius: 50%;
      .crown{
        width: pxToRem(74px);
        height: pxToRem(38px);
        display: block;
        position: relative;
        top: pxToRem(-38px);
        margin: auto;
        background-image: url(../../img/crown.png);
        background-size: cover;
      }
      button{
        &:before{
          content: '+';
          @include font-dpr(16px);
          line-height: 1;
          color: #FFF;
          align-self: flex-start;
          margin-left: pxToRem(10px);
        }
        span{
          align-self: center;
        }
        width: pxToRem(106px);
        height: pxToRem(42px);
        position: absolute;
        bottom: pxToRem(-10px);
        left: 50%;
        transform: translate(-50%, 0%);
        border: none;
        border-radius: pxToRem(3px);
        background-color: #f6a623;
        @include font-dpr(13px);
        color: #ffffff;
        display: flex;
        justify-items: center;
        justify-content: center;
      }
    }
    &-name{
      @include font-dpr(24px);
      font-weight: 500;
      line-height: 1;
      margin-top: pxToRem(25px);
      color: #404448;
    }
    &-label{
      display: flex;
      flex-direction: row;
      margin-top: pxToRem(20px);
      div{
        border-radius: pxToRem(3px);
        background-color: #54b0e8;
        padding: 0px pxToRem(7px);
        margin-right: pxToRem(10px);
      }
      img{
        height: pxToRem(30px);
        margin-right: pxToRem(10px);
      }
    }
    &-data{
      width: 100%;
      box-sizing: border-box;
      padding: pxToRem(90px) pxToRem(70px);
      &-apply{
        display: flex;
        flex-direction: column;
        padding: pxToRem(30px) pxToRem(40px) pxToRem(80px) pxToRem(40px);
        background-color: #fffaec;
        margin-top: pxToRem(40px);
        &-title{
          @include font-dpr(13px);
          line-height: 1.46;
          color: #ff6a22;
        }
        &-field{
          display: flex;
          flex-direction: row-reverse;
          @include font-dpr(12px);
          padding: pxToRem(10px) pxToRem(40px) pxToRem(30px);
          line-height: 1;
          color: #ff6a22;
          margin-top: pxToRem(40px);
          background-color: #ffffff;
          border: solid 1px rgba(255, 106, 34, 0.5);
          flex-wrap: wrap;
          justify-content: center;
          text-align: center;
          span{
            margin-right: pxToRem(10px);
            margin-top: pxToRem(20px);
            white-space: nowrap;
            display: inline-block;
          }
        }
        &-result{
          @include font-dpr(17px);
          line-height: 1;
          text-align: left;
          color: #00b65e;
          margin-top: pxToRem(60px);
          display: flex;
          align-items: center;
          justify-content: center;
          &:before{
            content: '';
            display: block;
            margin-right: pxToRem(10px);
            width: pxToRem(36px);
            height: pxToRem(36px);
            background-image: url(../../img/gou.jpg);
            background-size: cover;
          }
        }
        &-button{
          display: flex;
          width: 100%;
          margin-top: pxToRem(60px);
          justify-content: center;
          align-items: center;
          button{
            width: pxToRem(240px);
            height: pxToRem(76px);
            color: #fff;
            @include font-dpr(17px);
            font-weight: 500;
            line-height: 1;
            border: none;
            border-radius: pxToRem(3px);
            background-color: #ff5647;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              align-self: center;
            }
            &:before{
              content: '+';
              @include font-dpr(16px);
              line-height: 1;
              color: #FFF;
              margin-left: pxToRem(30px);
              align-self: flex-start;
            }
          }
        }
      }
      &-title{
        display: flex;
        align-items: flex-end;
        flex-wrap: wrap;
        margin-bottom: pxToRem(40px);
        justify-content: center;
        i{
          width: pxToRem(26px);
          height: pxToRem(32px);
          display: block;
          background-repeat: no-repeat;
          background-image: url(../../img/data.png);
          background-size: cover;
        }
        span:nth-child(2){
          @include font-dpr(15px);
          font-weight: 500;
          line-height: 0.93;
          color: #404448;
          margin-left: pxToRem(15px);
          white-space:nowrap;
        }
        span:nth-child(3){
          @include font-dpr(10px);
          line-height: 1;
          color: #b4b8c2;
          margin-left: pxToRem(15px);
          margin-top: pxToRem(20px);
        }
      }
      &-show{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        &-item{
          h3{
            @include font-dpr(27px);
            font-weight: 500;
            line-height: 1.11;
            color: #ff5647;
          }
          span{
            @include font-dpr(12px);
            line-height: 1;
            color: #b4b8c2;
            display: flex;
            margin-top: pxToRem(15px);
            align-items: center;
            white-space: nowrap;
            i{
              width: pxToRem(26px);
              height: pxToRem(26px);
              display: block;
              background-image: url(../../img/question.png);
              background-size: cover;
            }
          }
        }
      }
      &-pre{
        margin-top: pxToRem(40px);
        &-item{
          display: flex;
          margin-top: pxToRem(20px);
          align-items: center;
          &-name{
            width: pxToRem(200px);
            display: flex;
            align-items: center;
            margin-right: pxToRem(20px);
            justify-content: space-between;
            span{
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
            }
            i{
              width: pxToRem(26px);
              height: pxToRem(26px);
              display: block;
              background-image: url(../../img/question.png);
              background-size: cover;
            }
          }
        }
      }
      &.apply{
        padding: pxToRem(90px) pxToRem(30px) pxToRem(60px) pxToRem(30px);
        .user-data-title{
          justify-content: center;
        }
      }
    }
  }

  .progress-bar{
    width: pxToRem(200px);
    height: pxToRem(10px);
    border-radius: pxToRem(6px);
    margin-right: pxToRem(20px);
    background-color: #eaeaea;
    &-residue{
      height: 100%;
      border-radius: pxToRem(6px);
      background-image: linear-gradient(100deg, #37c4d7, #4dc69c);
    }
  }

</style>
