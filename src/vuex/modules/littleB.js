import {
  SET_JIXING,
  SET_PINPAI,
  SET_ATTR,
  SET_PRICE
} from '../motation-types'
const mutations = {
  [SET_JIXING] (state, jixinglist) {
    console.log(123333)
    state.jixinglist = jixinglist
  },
  [SET_PINPAI] (state, pinpailist) {
    state.pinpailist = pinpailist
  },
  [SET_PRICE] (state, pricelist) {
    state.pricelist = pricelist
  },
  [SET_ATTR] (state, attrlist) {
    state.attrlist = attrlist
  }
}

export default mutations
