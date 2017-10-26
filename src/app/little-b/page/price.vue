<template lang="html">
  <div class='price-box'>
    <!-- 品牌 机型 内存 版本选择部分 -->
    <ul class='price-list-box'>
      <li :class='["price-list-item-box", mustWarn ? "warn": ""]' v-for='(item,index) in listData' @click='select(index)'>
        <ListItem :despData='item' :listSelectData='listSelectData'></ListItem>
      </li>
    </ul>

    <p class='serch-box'>
      <span class='activity-price'>
        <i class='text'>活动价格</i>
        <b class='price'>
          <i class='rmb' v-if='price'>￥</i>
          {{price && !firstGet ? price : '无结果'}}
        </b>
      </span>
      <span class='search-button' @click='search'>查询</span>
    </p>
    <p class='other-desp'>*机型内不存在的商品不参与活动</p>

    <!-- 机型价格表部分  -->
    <section class='table-box'>
      <TableTitle></TableTitle>
      <TableCaption></TableCaption>
      <TableList :tablist='tablist'></TableList>
    </section>
    <span class='toTop' v-show='goTopShow' @click='goTop'></span>

    <!-- 机型选择弹窗  -->
    <template v-if='show'>
          <yp-select :list='list' name='name' :show='show' @close='close' @ok='ok'></yp-select>
    </template>
  </div>
</template>

<script>
import {getPinpaiList, getJixingList, getAttrlist, searchPrice} from '../api/index.js'
import {iconList} from '../api/data.js'
import Vue from 'vue'
import Select from '@zz-yp/vue-ui-lib/dist/select'
Vue.component(Select.name, Select)
export default {
  data () {
    return {
      price: '',
      list: [],
      name: 'pinpai',
      listSelectData: {
        pinpai: {},
        jixing: {},
        neicun: {},
        banben: {}
      },
      listData: iconList,
      show: false,
      goTopShow: false,
      mustWarn: false,
      activityId: this.$route.params.activityId,
      id: this.$route.params.id,
      tablist: [],
      firstGet: true
    }
  },
  created () {
    this.searchPrice()
    document.addEventListener('scroll', (e) => {
      const a = document.documentElement.clientHeight
      const b = document.documentElement.scrollTop || document.body.scrollTop
      b > a ? this.goTopShow = true : this.goTopShow = false
    }, false)
  },
  components: {
    ListItem: () => import('../components/list.vue'),
    TableTitle: () => import('../components/tableTitle.vue'),
    TableCaption: () => import('../components/tableCaption.vue'),
    TableList: () => import('../components/tableList.vue')
  },
  methods: {
    goTop () {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    select (index) {
      const vals = Object.values(this.listSelectData)
      vals.some((item, k) => {
        if (k === index) return true
        item.name ? '' : index = k
        return !item.name
      })
      switch (index) {
        case 0:
          getPinpaiList().then(data => {
            this.list = data
          })
          this.name = 'pinpai'
          break
        case 1:
          getJixingList({pinpaiId: this.listSelectData.pinpai.id}).then(data => {
            this.list = data
          })
          this.name = 'jixing'
          break
        case 2:
          getAttrlist({modelId: this.listSelectData.jixing.id}).then(data => {
            this.list = data.capacity
          })
          this.name = 'neicun'
          break
        case 3:
          getAttrlist({modelId: this.listSelectData.jixing.id}).then(data => {
            this.list = data.buyChannel
          })
          this.name = 'banben'
          break
        default:
      }
      this.show = true
    },
    search () {
      const vals = Object.values(this.listSelectData)
      vals.some(item => {
        item.name ? this.mustWarn = false : this.mustWarn = true
        return this.mustWarn
      })
      if (!this.mustWarn) {
        this.firstGet = false
        this.searchPrice()
      }
    },
    searchPrice () {
      searchPrice({
        activityId: this.id,
        modelId: this.listSelectData.jixing.id,
        capacity: this.listSelectData.neicun.id,
        buyChannel: this.listSelectData.banben.id
      }).then(data => {
        this.$set(this, 'tablist', data)
        if (data) this.price = data[0] && Object.values(data[0].xinghao[0].banben[0].price)[0]
      }).catch()
    },
    ok (data) {
      this.show = false
      this.clearUp(data)
      switch (this.name) {
        case 'pinpai':
          Object.assign(this.listSelectData, {pinpai: {name: data.name, id: data.id}})
          break
        case 'jixing':
          Object.assign(this.listSelectData, {jixing: {name: data.name, id: data.id}})
          break
        case 'neicun':
          Object.assign(this.listSelectData, {neicun: {name: data.name, id: data.id}})
          break
        case 'banben':
          Object.assign(this.listSelectData, {banben: {name: data.name, id: data.id}})
          break
        default:
      }
    },
    clearUp (data) {
      if (data.id !== this.listSelectData[this.name].id) {
        const keys = Object.keys(this.listSelectData)
        let up = false
        console.log(this.name)
        keys.map((item, k) => {
          if (item === this.name) {
            console.log('same')
            up = true
          }
          if (up) {
            switch (item) {
              case 'pinpai':
                Object.assign(this.listSelectData, {pinpai: {}})
                break
              case 'jixing':
                Object.assign(this.listSelectData, {jixing: {}})
                break
              case 'neicun':
                Object.assign(this.listSelectData, {neicun: {}})
                break
              case 'banben':
                Object.assign(this.listSelectData, {banben: {}})
                break
              default:
            }
          }
        })
      }
    },
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
@import "../style/price.scss";
</style>
