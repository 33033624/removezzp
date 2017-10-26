import coreJsonp from 'jsonp'
import axios from 'axios'

const timeout = 20000

/* eslint-disable eqeqeq */
const getJsonp = (url, params = {}, opts = {}) => {
  let query = url.indexOf('?') === -1 ? '?' : '&'
  query += Object
    .keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  // 需要对respCode非0的情况做处理
  const { withoutVerify } = opts
  return new Promise((resolve, reject) => {
    coreJsonp(`${url}${query}`, {timeout: timeout}, (err, data) => {
      if (!err) {
        if (withoutVerify) {
          resolve(data)
          return
        }
        data.respCode == 0
        ? resolve(data.respData)
        : reject(data.errMsg)
      } else {
        reject('网络异常，请重试')
      }
    })
  })
}

// 未做error处理 后续加上
const getJson = (url, params = {}, opts = {}) => axios.get(url, {
  params,
  withCredentials: true,
  timeout: timeout
}).then(axios => axios.data).then(
  data => new Promise((resolve, reject) => {
    const {respCode, respData, errMsg} = data
    const { withoutVerify } = opts
    if (withoutVerify) {
      resolve(data)
      return
    }
    respCode == 0 ? resolve(respData) : reject(errMsg)
  })
)

export const get = (url, params = {}, opts = {}) => {
  const { cors } = opts || {}
  if (url.indexOf('//') === -1) {
    url = '//youpin.m.58.com/' + url
  }
  return cors
    ? getJson(url, params, opts)
    : getJsonp(url, params, opts)
}
