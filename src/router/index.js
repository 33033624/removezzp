import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/youpin/B',
  routes: [
    {
      path: '/littleB',
      name: 'littleB',
      component: () => import(/* webpackChunkName: "littleB" */'app/little-b/app.vue'),
      children: [
        {
          path: 'activity/:zzActivityId/:id',
          name: 'little-b-activity',
          component: () => import(/* webpackChunkName: "littleB-activity" */'app/little-b/page/activity.vue')
        },
        {
          path: 'price/:zzActivityId/:id',
          name: 'little-b-price',
          component: () => import(/* webpackChunkName: "littleB-price" */'app/little-b/page/price.vue')
        }
      ]
    },
    {
      path: '/good-seller',
      component: () => import(/* webpackChunkName: "goodseller" */'app/good-seller/app.vue'),
      children: [
        {
          name: 'apply',
          path: 'apply',
          component: () => import(/* webpackChunkName: "goodseller.apply" */'app/good-seller/page/apply.vue')
        }, {
          name: 'auth',
          path: 'auth',
          component: () => import(/* webpackChunkName: "goodseller.apply" */'app/good-seller/page/auth.vue')
        }
      ]
    },
    {
      path: '/seller',
      redirect: '/seller/centre',
      component: () => import(/* webpackChunkName: "sellercentre" */'app/seller-centre/app.vue'),
      children: [
        {
          name: 'centre',
          path: 'centre',
          component: () => import(/* webpackChunkName: "sellercentre.centre" */'app/seller-centre/page/centre.vue')
        }, {
          name: 'share',
          path: 'share',
          component: () => import(/* webpackChunkName: "sellercentre.share" */'app/seller-centre/page/share.vue')
        }
      ]
    }
  ]
})
