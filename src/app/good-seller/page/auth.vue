<template>
  <div class="auth">
    <div class="banner"></div>
    <div class="state fail" v-if="state === 'fail'">
      <div class="state-title"><i class="icon"></i>认证失败</div>
      <div class="state-desc">失败原因:</div>
      <ul class="state-fail-reason">
        <li v-for="i in failReason">
          &#8226&nbsp{{i}}
        </li>
      </ul>
      <p class="state-fail-reason-tip">别气馁，每次审核只取近30天记录。你可以从现在开始积累数据，随时重新申请哦！</p>
    </div>
    <div class="state succ" v-if="state === 'succ'">
      <div class="state-title"><i class="icon"></i>认证成功</div>
      <div class="state-desc">恭喜你认证成功！标签将在24小时内标记成功，<br>之后你就能在个人中心看到啦~</div>
    </div>
    <div class="state wait" v-if="state === 'wait'">
      <div class="state-title"><i class="icon"></i>等待审核中...</div>
      <div class="state-desc">请耐心等待申请结果， 有消息我会通过系统消息<br>告诉你的~你也可以随时到这里看进度哦~</div>
    </div>
    <h3 class="title">认证后有啥好处?</h3>
    <ul class="adv-wrap">
      <li v-for="i in advLables" class="adv">
        <i :style="{backgroundImage: `url(${i.icon})`}"></i>
        <div class="content">
          <h2>{{i.h2}}</h2>
          <h5>{{i.h5}}</h5>
        </div>
      </li>
    </ul>
    <h3 class="title">申请有啥要求?</h3>
    <ul class="require-wrap">
      <li>
        <div class="item-title">&#8226&nbsp<strong>5</strong>台以上</div>
        <div class="item-desc">&nbsp&nbsp&nbsp近30天手机交易量</div>
      </li>
      <li>
        <div class="item-title">&#8226&nbsp<strong>4.5</strong>分以上</div>
        <div class="item-desc">&nbsp&nbsp&nbsp买家好评率</div>
      </li>
      <li>
        <div class="item-title">&#8226&nbsp<strong>80</strong>%以上</div>
        <div class="item-desc">&nbsp&nbsp&nbsp手机交易成功率</div>
      </li>
      <li>
        <div class="item-title">&#8226&nbsp<strong>100</strong>%</div>
        <div class="item-desc">&nbsp&nbsp&nbsp走转转验机</div>
      </li>
    </ul>
    <p class="require-desc">以上数据只取近30天记录</p>
    <h3 class="title big">怎么申请认证手机好买家?</h3>
    <ul class="flow-wrap">
      <li>提交申请</li>
      <li>平台审核</li>
      <li>认证通过</li>
    </ul>
    <div class="rule">&nbsp我同意交易100%走验机服务</div>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  import { getState, apply } from '../api'
  export default {
    created () {
      native.share({
        title: '手机好卖家申请',
        content: '转转又要搞事情了！！来看看手机好卖家是啥！',
        picPath: 'https://img.58cdn.com.cn/youpin/yunying/upload_c65c4634a8d5a7907de18ae379c5063b.png',
        url: location.href
      })
      const uid = native.in('zz') && native.getUid()
      if (uid) {
        getState(uid).then(data => {
          this.setMyState(data)
        })
      }
      this.$root.btn.setBtn('申请', () => {
        this.apply()
      })
    },
    methods: {
      apply () {
        if (!native.in('zz')) {
          native.zzCaller.goWeb(location.href)
        } else {
          native.login(json => {
            if (json.code === '0') {
              apply(native.getUid()).then(data => {
                this.setMyState(data)
              })
            }
          })
        }
      },
      setMyState (data) {
        const { state, failReason } = data
        switch (state) {
          case -1:
            this.state = 'apply'
            break
          case 0:
            this.state = 'wait'
            this.$root.btn.setBtn('等待审核')
            break
          case 1:
            this.$root.btn.setBtn('再次认证', () => {
              this.apply()
            })
            this.failReason = failReason
            this.state = 'fail'
            break
          case 2:
            this.$root.btn.setBtn('认证成功')
            this.state = 'succ'
        }
      }
    },
    data: () => ({
      state: 'apply', // apply, wait, succ, fail
      failReason: [],
      advLables: [
        {
          h2: '排序更靠前',
          h5: '交易数量越高排序越靠前',
          icon: require('../img/auth-i-1.png')
        }, {
          h2: '更多发布权',
          h5: '最多可以同时发布15台手机哦',
          icon: require('../img/auth-i-2.png')
        }, {
          h2: '展示交易数 / 好评分',
          h5: '让买家更快了解你',
          icon: require('../img/auth-i-3.png')
        }, {
          h2: '官方认证标签',
          h5: '买家买的更放心',
          icon: require('../img/auth-i-4.png')
        }
      ]
    })
  }
</script>

<style lang="scss" scoped>
  @import "./util.scss";
  .auth {
    padding-top: pxToRem(50px);
    counter-reset: section;
  }
  .banner {
    @include bg-pic('auth-banner.png');
    @include size(pxToRem(589px), pxToRem(177px));
    margin: auto;
  }
  .state  {
    &.succ {
      background: #e1f4e5;
      .state-title {
        color: #00b65e;
      }
      .state-desc {
        color: #65ca8e;
      }
      .icon {
        @include bg-pic('auth-succ.png');
      }
    }
    &.wait {
      background: #fff9e1;
      .state-title {
        color: #ff6511;
      }
      .state-desc {
        color: #ffac81;
      }
      .icon {
        @include bg-pic('auth-wait.png');
      }
    }
    &.fail {
      background: #ededed;
      .state-title {

      }
      .state-desc {
        color: #676767;
      }
      .state-fail-reason {
        color: #969696;
      }
      .icon {
        @include bg-pic('auth-fail.png');
      }
    }
  }
  .state {
    width: pxToRem(600px);
    margin: pxToRem(50px) auto 0;
    padding: pxToRem(50px) 0;
    border-radius: pxToRem(20px);
    text-align: center;
    &-title {
      @include font-dpr(21px);
      font-weight: 600;
    }
    &-desc {
      margin-top: pxToRem(25px);

    }
    &-fail-reason {
      margin-top: pxToRem(20px);
    }
    .icon {
      @include size(pxToRem(44px), pxToRem(44px));
      display: inline-block;
      vertical-align: bottom;
      margin-right: pxToRem(10px);
    }
  }
  h3.title {
    @include font-dpr(15px);
    display: block;
    margin: pxToRem(60px) auto 0;
    color: #ae3900;
    font-weight: 600;
    text-align: center;
    position: relative;
    padding-bottom: pxToRem(5px);
    &:before {
      counter-increment: section;
      content: counter(section);
      font-family:"Times New Roman",Georgia,Monospace;
      background: #ae3900;
      color: #fff;
      padding: 0 .3em;
      border-radius: 1em;
      margin-right: .5em;
    }
    &:after {
      @include size(pxToRem(320px), pxToRem(20px));
      background: #ffe9d4;
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      top: auto;
      transform: translate(-50%);
      bottom: 0;
      z-index: -1;
    }
  }
  h3.title.big:after {
    width: pxToRem(440px);
  }
  .adv-wrap {
    margin-top: pxToRem(40px);
    .adv {
      @include size(pxToRem(600px), pxToRem(135px));
      @extend %flex;
      margin: auto;
      background: #fff0e3;
      border-radius: pxToRem(70px);
      box-sizing: border-box;
      padding: pxToRem(20px) pxToRem(80px);
      &:not(:nth-child(1)) {
        margin-top: pxToRem(20px);
      }
      i {
        @include size(pxToRem(88px), pxToRem(92px));
        @include bg-pic('auth-i-1.png');
        margin-right: pxToRem(20px);
      }
      h2 {
        font-size: pxToRem(34px);
        color: #ff6511;
      }
      h5 {
        font-size: pxToRem(24px);
        margin-top: pxToRem(15px);
        color: #ff9d65;
      }
    }
  }
  .flow-wrap {
    @extend %flex;
    padding: 0 pxToRem(90px);
    margin-top: pxToRem(65px);
    li {
      flex: 1;
      text-align: center;
      position: relative;
      &:not(:last-child):after {
        @include size(pxToRem(36px), pxToRem(10px));
        @include bg-pic('dot-3.png');
        content: '';
        position: absolute;
        left: auto;
        right: 0;
        top: pxToRem(40px);
        transform: translate(50%);
      }
    }
    li:before {
      @include size(pxToRem(78px), pxToRem(78px));
      content: '';
      display: block;
      margin: 0 auto pxToRem(25px);
    }
    li:nth-child(1):before {
      @include bg-pic('auth-s-1.png');
    }
    li:nth-child(2):before {
      @include bg-pic('auth-s-2.png');
    }
    li:nth-child(3):before {
      @include bg-pic('auth-s-3.png');
    }
  }
  .require-wrap {
    font-size: 0;
    padding: 0 0 0 pxToRem(95px);
    margin-top: pxToRem(60px);
    strong {
      font-size: 1.8em;
      margin-right: .2em;
    }
    li {
      @include font-dpr(12px);
      width: 50%;
      box-sizing: border-box;
      display: inline-block;
      margin-top: pxToRem(40px);
      &:nth-child(1), &:nth-child(2) {
        margin-top: 0;
      }
    }
    .item-title {
      @include font-dpr(15px);
      color: #ff6511;
    }
    .item-desc {
      color: 808080;
    }
  }
  .rule {
    margin-top: pxToRem(50px);
    margin-bottom: pxToRem(30px);
    text-align: center;
    color: #ae3900;
    &:before {
      @include bg-pic('agree.png');
      content: '阿';
      font-family:"Times New Roman",Georgia,Monospace;
      padding: 0 0.1em;
      color: transparent;
    }
  }
  .require-desc{
    text-align: center;
    margin-top: pxToRem(20px);
  }
  .state-fail-reason-tip{
    margin-top: pxToRem(20px);
    padding: 0 pxToRem(30px);
    color: #ff6a19;
  }
</style>
