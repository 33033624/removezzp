// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// polyfills (before vuex!!)
import 'es6-promise/auto'
import 'core-js/es6/array'
import router from './router'
// import store from './store'
import infiniteScroll from 'vue-infinite-scroll'
import {performancePlugin, routerHook} from '@zz-yp/vue-performance'
import Loading from 'components/loading'
// flexible
require('assets/lib/flexible.js')
Vue.config.productionTip = false

// vconsole debug
// import 'assets/lib/vconsole.min.js'

// common components
Vue.component('Loading', Loading)

Vue.use(infiniteScroll)
// 性能统计
Vue.use(performancePlugin)
router.beforeEach(routerHook)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
