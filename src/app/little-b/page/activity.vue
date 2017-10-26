<template lang="html">
    <div class='instructions-box' @scroll='scroll($event)' @touchmove.stop>
      <section class='img-wrap'>
        <img :src='picture' alt="">
      </section>

      <!-- 商品列表部分 -->
      <ul class='good-list' >
        <li class='good-item' v-for='(i,k) in shangpinList'>
          <GoodList @editPublish='enterPublick' @reason='reason' :shangpin='i' @appendAct='participateIn' :k='k'></GoodList>
        </li>
      </ul>

      <!-- 查看原因弹窗 -->
      <Modal v-if='modalShow'>
        <template slot='contain'>
          <div class='model-contain-box'>
            <p class='model-cha'>
            <span @click='hideModel'>x</span>
            </p>
            <span class='model-title'>{{modalData.infoTitle}}</span>
            <p class='model-text' v-for='reason in modalData.reason'>{{reason}}</p>
            <span class='model-button'  @click='hideModel'>确定</span>
          </div>
        </template>
      </Modal>

<!-- 填写秒杀价格 -->
      <ModalInput name="actModal" @notify="actInput" v-show="inputActShow" >
        <template slot="content" slot-scope="props">
          <h3>秒杀价格</h3>
          <input type="text" placeholder="填写您商品的秒杀价格" v-model="actPrice">
        </template>
      </ModalInput>
    </div>
</template>

<script>
import native from '@zz-yp/native-adapter'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import {getShangpinList, ypValidate, getActivityDetail} from '../api/index.js'
import {getCookie} from 'util/cookiejs.js'
import Toast from '@zz-yp/vue-ui-lib/dist/toast'
Vue.use(VueLazyload)
export default {
  data () {
    return {
      modalShow: false,
      shangpinList: [],
      modalData: {},
      pageNum: 0,
      zzActivityId: this.$route.params.zzActivityId,
      id: this.$route.params.id,
      uid: getCookie('uid'),
      actPrice: '',
      inputActShow: false,
      type: '',
      actItem: {},
      picture: '',
      load: true,
      k: ''
    }
  },
  created () {
    this.getActivityDetail()
    this.getSP()
    native.in('zz') ? window.ZZAPP.setRightBtn({label: '活动价格表', color: '#ff5647', url: `//m.zhuanzhuan.58.com/youpin/activities/littleB/price/${this.zzActivityId}/${this.id}`, newPageTitle: '活动价格表'}, () => {}) : ''
  },
  watch: {
    shangpinList (newval) {
      console.log('newcval')
    }
  },
  methods: {
    getSP () {
      const {uid, zzActivityId} = this
      getShangpinList({
        uid: uid,
        activityId: zzActivityId,
        pageNum: ++this.pageNum,
        pageSize: 20
      }).then(data => {
        if (!data.length) this.load = false
        this.shangpinList = this.shangpinList.concat(data)
      }).catch(errMsg => {
        console.log(errMsg)
        Toast(errMsg)
      })
    },
    getActivityDetail () {
      getActivityDetail({id: this.id}).then(data => {
        this.picture = `${data.rulePic}`
        this.type = data.type
        native.setTitle({
          title: data.title
        })
      }).catch(errMsg => {
        Toast(errMsg)
      })
    },
    actInput () {
      if (/^\d+$/.test(this.actPrice)) {
        this.inputActShow = false
        this.enterActivity()
      } else {
        Toast('请填写正确的价格')
      }
    },
    participateIn (item, k) {
      this.actItem = item
      this.k = k
      if (this.type === 2) {
        this.inputActShow = true
        this.actPrice = ''
        this.$modal.actModal.show()
      } else {
        this.enterActivity()
      }
    },
    enterActivity () {
      const {id, actPrice, actItem, k} = this
      ypValidate({activityId: id, actPrice, infoId: actItem.infoId}).then(data => {
        if (data.applyStatus === 1) {
          Toast(data.msg)
          const curArr = Object.assign(this.shangpinList[k], {auditStatus: '1'})
          var a = {auditStatus: '1'}
          Object.assign(a, curArr)
          console.log(a)
          this.shangpinList.splice(k, 1, a)
        } else {
          if (data.returnType === 1) {
            this.modalShow = true
            Object.assign(this.modalData, {reason: data.reasonList})
          } else if (data.returnType === 0) {
            Toast(data.msg)
          }
        }
      }).catch(errMsg => {
        Toast(errMsg)
      })
      // native.login(json => {
      //   if (json.code === '0') {
      //
      //   }
      // })
    },
    enterPublick (id) {
      window.ZZAPP.editPublish({infoId: id}, () => {})
    },
    reason (item) {
      this.modalShow = true
      this.modalData = item
    },
    hideModel () {
      this.modalShow = false
      this.modalData = {}
    },
    scroll (e) {
      const tar = e.target
      const Scheight = tar.scrollHeight
      const Cli = document.documentElement.clientHeight || document.body.clientHeight
      const ScrollTop = tar.scrollTop
      const isLoad = ScrollTop + Cli - Scheight
      if (!isLoad && this.load) {
        this.getSP()
      }
    }
  },
  components: {
    GoodList: () => import('../components/goodList.vue'),
    Modal: () => import('../components/modal.vue'),
    ModalInput: () => import('../components/modalInput.vue')
  }
}
</script>
<style lang='scss' scoped>
@import "../style/activity.scss";
</style>
