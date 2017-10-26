<template>
  <div v-if="isShow" class="ui-modal-wrap" @touchmove.prevent="noop" @click="side">
    <div v-if="isShow" class="ui-modal-content" @click.stop="noop">
      <slot name="content" :param="passIn"></slot>
      <div class="ui-modal-op">
        <a v-if="this.sideTxt" href="javascript:;" class="ui-modal-btn side" @click.stop="side">{{sideTxt}}</a>
        <a href="javascript:;" class="ui-modal-btn" @click.stop="main">{{mainBtn}}</a>
      </div>
      <div class="btn-x" @click="close"></div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    props: ['mainTxt', 'sideTxt', 'name'],
    data () {
      return {
        isShow: false,
        passIn: {}
      }
    },
    created () {
      Vue.prototype.$modal = Vue.prototype.$modal || {}
      let { $modal } = Vue.prototype
      const { name } = this
      $modal[name] = this
    },
    computed: {
      mainBtn: function () {
        return this.mainTxt || '确定'
      }
    },
    methods: {
      close () {
        this.isShow = false
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
      },
      show (obj) {
        this.passIn = obj
        this.isShow = true
        document.documentElement.style.overflow = 'hidden'
        document.body.style.overflow = 'hidden'
      },
      side () {
        // todo
        this.$emit('notify', {type: 'side'})
      },
      main () {
        // todo
        this.$emit('notify', {type: 'main'})
      },
      noop () {}
    }
  }
</script>
<style lang="scss">
    .ui-modal-wrap{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        z-index: 999;
    }
    $cred: #ff5647;
    .ui-modal-content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: pxToRem(620px);
        min-height: pxToRem(200px);
        border-radius: pxToRem(10px);
        background-color: #FFF;
        padding: pxToRem(135px) pxToRem(55px) pxToRem(60px);
        box-sizing: border-box;
        &:before{
            content: "";
            width: pxToRem(173px);
            height: pxToRem(176px);
            position: absolute;
            top: pxToRem(-90px);
            left: 50%;
            transform: translate(-50%,0);
            background: url(../img/modal-top.png) no-repeat;
            background-size: 100%;
        }
        h3,h4{
          color: #43474c;
          text-align: center;
          font-weight: bold;
        }
        h3{
          line-height: 1;
          @include font-dpr(18px);
          margin-bottom: pxToRem(25px);
        }
        h4{
          display: flex;
          align-items: center;
          @include font-dpr(14px);
          padding-top: pxToRem(30px);
          padding-bottom: pxToRem(20px);
          &:before,&:after{
            content: "";
            flex: 1;
            height: 1px;
            background-color: #EAEAEA;
          }
          &:before{
            margin-right: pxToRem(30px);
          }
          &:after{
            margin-left: pxToRem(30px);
          }
        }
        p{
          @include font-dpr(14px);
          color: #7b828b;
          text-align: center;
          line-height: 1.5;
        }
        em{
          font-weight: bold;
          color: $cred;
        }
        input[type="text"]{
          width: 100%;
          height: pxToRem(80px);
          border: 0;
          outline: 0;
          background-color: #f1f3f6;
          border-radius: pxToRem(10px);
          text-align: center;
          @include font-dpr(14px);
        }
        .form-row{
          @extend %flex;
          align-items: center;
          margin-bottom: pxToRem(20px);
          .label{
            @include font-dpr(14px);
            color: #7b828b;
          }
          .price{
            color: $cred;
            @include font-dpr(21px);
            .ui-rmb{
              i{
                @include font-dpr(13px);
                margin-right: pxToRem(5px);
              }
            }
          }
          input[type="text"]{
            flex: 1;
          }
        }
        .ui-modal-op{
          @extend %flex;
          margin-top: pxToRem(50px);
          .ui-modal-btn{
            flex: 1;
            height: pxToRem(80px);
            line-height: pxToRem(80px);
            text-align: center;
            border-radius: pxToRem(10px);
            background-color: $cred;
            color: #fff;
            @include font-dpr(16px);
            &.side{
              margin-right: pxToRem(20px);
              background-color: #516fd3;
            }
          }
        }
        .btn-x{
          width: pxToRem(72px);
          height: pxToRem(72px);
          position: absolute;
          left: 50%;
          transform: translate(-50%,0);
          bottom: pxToRem(-122px);
          border: 1px solid #fff;
          border-radius: 100%;
          background: url(../img/modal-x.png) no-repeat center;
          background-size: pxToRem(32px);
        }
    }
</style>
