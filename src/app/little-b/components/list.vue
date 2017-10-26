<template lang="html">
  <div class='list-item-wrap'>
    <span class='icon-left-box'>
      <i :class="`left-icon left-icon-${despData.icon}`"></i>
      <b class='left-text'>{{despData.title}}</b>
    </span>
    <span class='icon-right-box'>
      <i :class='["right-text", !listSelectData[despData.icon]["name"] ? "right-text-no" : ""]'>{{listSelectData[despData.icon]['name'] || '必填'}}</i>
      <b class='right-tab-icon'></b>
    </span>
  </div>
</template>

<script>
export default {
  props: ['despData', 'listSelectData'],
  data () {
    return {
      listData: [
        {
          title: '品牌',
          icon: 'pinpai'
        },
        {
          title: '机型',
          icon: 'jixing'
        },
        {
          title: '内存',
          icon: 'neicun'
        },
        {
          title: '版本',
          icon: 'banben'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.list-item-wrap{
  display: flex;
  flex-direction: row;
  margin: 0 pxToRem(30px);
  padding: pxToRem(28px) 0;
  border-bottom: 1px solid #eeeeee;
  .icon-left-box,.icon-right-box{
    display: flex;
    height: pxToRem(44px);
    width: 50%;
    align-items: center;
    @include font-dpr(15px);
    color: #595959;
  }
  .left-text{
    font-weight: normal;
  }
  .left-icon{
    width: pxToRem(36px);
    height: pxToRem(44px);
    margin-right: pxToRem(31px);
  }
  .icon-left-box{
  }
  .icon-right-box{
    justify-content: flex-end;
    &>*{
      display: inline-block;
    }
  }
  $icons: 'jixing' 'banben' 'neicun' 'pinpai';
  @each $icon in $icons {
    .left-icon-#{$icon}{
      background: url('../img/#{$icon}.png') no-repeat center;
      background-size: cover;
    }
  }
  .right-tab-icon{
    height: pxToRem(22px);
    width: pxToRem(14px);
    background: red;
    background: url('../img/tab.png') no-repeat center;
    background-size:cover;
  }
  .right-text{
    margin-right: pxToRem(30px);
    color: #ff5647;
  }
  .right-text-no{
    color:#aaaeb9;
  }
}
</style>
