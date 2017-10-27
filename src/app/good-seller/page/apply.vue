<template>
  <div class="apply">
    <div class="banner"></div>
    <h5 class="title">手机好卖家是什么?</h5>
    <ul class="body">
      <li v-for="i in labels">
        <i :style="{backgroundImage: `url(${i.icon})`}"></i>
        <div class="content">
          <h3>{{i.h3}}</h3>
          <h6>{{i.h6}}</h6>
        </div>
      </li>
    </ul>
    <div class="ps">
      重要提示：交易记录良好的卖家，他的交易数量和好评<br>分将会展示出来供你参考哦～
    </div>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  export default {
    created () {
      native.share({
        title: '手机好卖家申请说明',
        content: '转转又要搞事情了！！来看看手机好卖家是啥！',
        picPath: 'https://img.58cdn.com.cn/youpin/yunying/upload_c65c4634a8d5a7907de18ae379c5063b.png',
        url: location.href
      })
      this.$root.btn.setBtn('我也要申请', () => {
        this.$router.push('auth')
      })
    },
    data: () => ({
      labels: [
        {
          h3: '手机交易老司机',
          h6: '近30天手机交易5台以上',
          icon: require('../img/apply-i-1.png')
        }, {
          h3: '成功率高',
          h6: '手机交易成功率高于80%',
          icon: require('../img/apply-i-2.png')
        }, {
          h3: '口口皆碑',
          h6: '4.5分以上高分好评',
          icon: require('../img/apply-i-3.png')
        }, {
          h3: '100%支持验机',
          h6: '走转转验机，杜绝一切诈骗',
          icon: require('../img/apply-i-4.png')
        }
      ]
    })
  }
</script>
<style lang="scss" scoped>
@import "./util.scss";
.apply {
  padding-top: pxToRem(50px);
}
.banner {
  @include bg-pic('banner.png');
  @include size(pxToRem(521px), pxToRem(200px));
  background-size: pxToRem(521px) pxToRem(200px);
  margin: auto;
}
h5.title {
  @include font-dpr(15px);
  margin-top: pxToRem(50px);
  text-align: center;
  color: #f68029;
  &:after {
    @include bg-pic('title-line.png');
    @include size(pxToRem(400px), pxToRem(10px));
    content: '';
    display: block;
    margin: pxToRem(15px) auto 0;
  }
}
ul.body {
  @include size(pxToRem(640px), pxToRem(600px));
  background-color: #fff0e3;
  color: #ff6511;
  margin: pxToRem(20px) auto 0;
  padding: pxToRem(60px) pxToRem(110px);
  box-sizing: border-box;
  position: relative;
  &:after {
    @include size(pxToRem(143px), pxToRem(143px));
    @include bg-pic('apply-content-tag.png');
    content: '';
    display: block;
    position: absolute;
    left: auto;
    right: pxToRem(20px);
    top: pxToRem(300px);
  }
  li {
    @extend %flex;
    height: pxToRem(90px);
    &:not(:first-child) {
      padding-top: pxToRem(40px);
    }
    i {
      @include size(pxToRem(90px), pxToRem(85px));
      @include bg-pic('apply-i-1.png');
      display: block;
    }
    .content {
      margin-left: pxToRem(30px);
      h3 {
        font-size: pxToRem(34px); 
      }
      h6 {
        font-size: pxToRem(24px);
        color: #ff9d65;
        margin-top: pxToRem(15px);
        font-weight: 500;
      }
    }
  }
}
.ps {
  margin-top: pxToRem(20px);
  text-align: center;
  color: #b3b3b3;
}
</style>
