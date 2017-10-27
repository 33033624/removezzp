import { get } from 'utils/ajax.js'
// import get from './mock'

const apiPrefix = '//ypactivity.58.com'

export const getCompleteInfo = () => get(`${apiPrefix}/merchant/getCompleteInfo`, {}, {cors: true, withoutVerify: true})

export const getSharedInfo = (uid) => get(`${apiPrefix}/merchant/getSharedInfo`, {merchantId: uid}, {cors: true, withoutVerify: true})

export const applyTradeData = () => get(`${apiPrefix}/merchant/applyTradeData`, {}, {cors: true, withoutVerify: true})
