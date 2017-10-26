import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/littleB',
      component: () => import('app/little-b/app.vue'),
      children: [
        {
          path: 'activity/:zzActivityId/:id',
          component: () => import('app/little-b/page/activity.vue')
        },
        {
          path: 'price/:zzActivityId/:id',
          component: () => import('app/little-b/page/price.vue')
        }
      ]
    }
  ]
})
