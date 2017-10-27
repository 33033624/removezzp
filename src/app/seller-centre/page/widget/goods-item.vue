<template>
  <div class="goods-item" @click="goDetail">
    <div class="goods-item-swarp">
      <ul>
        <li class="goods-item-swarp-img" v-for="(img, idx) in goods.images" :key="idx">
          <div v-lazy:background-image="img"></div>
        </li>
      </ul>
    </div>
    <div class="goods-item-content">
      <div class="goods-item-content-title">
        <span>{{goods.title}}</span>
      </div>
      <div class="goods-item-content-summary">
        <span>{{goods.summary}}</span>
      </div>
      <div class="goods-item-content-tags">
        <img v-for="(tag, idx) in goods.tags" :key="idx" v-lazy="tag">
      </div>
      <div class="goods-item-content-bottom">
        <div class="goods-item-content-bottom-left">
          <div class="goods-item-content-bottom-left-price">
            <i>¥</i>
            <span>{{goods.price/100}}</span>
          </div>
        </div>
        <div class="goods-item-content-bottom-right">
          <span>{{goods.viewCount}}人浏览</span>
          <i>|</i>
          <span>{{goods.address}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import native from '@zz-yp/native-adapter'
  export default {
    props: ['goods'],
    methods: {
      goDetail () {
        const { goodsId } = this.goods
        let infoId = goodsId
        native.skipToDetail({infoId, type: 'zz'})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .goods-item{
    display: flex;
    flex-direction: column;
    padding: pxToRem(40px) pxToRem(30px) ;
    border-top: 1px solid #eaeaea;
    &-swarp ul{
      display: flex;
      width: 100%;
      overflow-y: scroll;
      flex-direction: row;
      div{
        width: pxToRem(224px);
        height: pxToRem(224px);
        margin-right: pxToRem(5px);
        background-size: cover;
        background-position: center;
      }
    }
    &-content{
      &-title{
        @include font-dpr(16px);
        font-weight: 500;
        line-height: 0.94;
        text-align: left;
        color: #43474c;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-top: pxToRem(30px);
      }
      &-summary{
        @include font-dpr(13px);
        line-height: 1.2;
        text-align: left;
        color: #43474c;
        margin-top: pxToRem(20px);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      &-tags{
        @include font-dpr(10px);
        color: #00b65e;
        margin-top: pxToRem(20px);
        img{
          height: pxToRem(30px);
          margin-right: pxToRem(10px);
        }
      }
      &-bottom{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: pxToRem(30px);
        &-left{
          color: #ff5647;
          i{
            @include font-dpr(10px);
            line-height: 2.05;
          }
          span{
            @include font-dpr(22px);
            line-height: 0.93;
          }
        }
        &-right{
          display: flex;
          flex-direction: row;
          @include font-dpr(12px);
          line-height: 1.08;
          color: #aaaeb9;
          i{
            margin: 0 pxToRem(15px);
          }       
        }
      }
    }
  }
</style>
