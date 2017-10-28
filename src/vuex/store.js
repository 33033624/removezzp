import Vue from 'vue'
import Vuex from 'vuex'

import littlebMutations from './modules/littleB'
import {
  jixinglist,
  attrlist,
  pricelist,
  pinpailist
} from './getters'
import {GET_JIXING_LIST} from './actions'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations: {
    ...littlebMutations
  },
  getters: {
    jixinglist,
    pinpailist,
    attrlist,
    pricelist
  },
  actions: {
    GET_JIXING_LIST
  },
  strict: true
})
