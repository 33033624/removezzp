import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './modules/index'
import {
  GET_TEST_STATE
} from './getters'
import * as actions from './actions/index'
import state from './state'

Vue.use(Vuex)
const tempMutatiosn = {}
Object.values(mutations).map(item => {
  const keys = Object.keys(item)
  keys.map(i => {
    tempMutatiosn[i] = item[i]
  })
})
console.log(tempMutatiosn)
export default new Vuex.Store({
  state,
  mutations: {
    ...tempMutatiosn
  },
  getters: {
    GET_TEST_STATE
  },
  actions,
  strict: true
})
