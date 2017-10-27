const wrap = (json) => ({respCode: 0, respData: json})
const apiPrefix = '//ypactivity.58.com/merchant/'

let map = {
  'getCompleteInfo': require('./userinformation.json'),
  'getShareInformation': require('./shareInformation.json'),
  'getPhoneList': require('./phoneList.json'),
  'getApply': require('./appaly.json')
}
for (var key in map) {
  if (map.hasOwnProperty(key)) {
    map[apiPrefix + key] = map[key]
  }
}
Object.keys(map).map(url => (map[url] = wrap(map[url])))
/* eslint-disable eqeqeq */
export default (path, param, opts) => {
  return new Promise((resolve, reject) => {
    // console.log(path.replace(/\?.*$/g, ''))
    const raw = map[path.replace(/\?.*$/g, '')]
    if (!raw) {
      console.log(`${path} no mock`)
      reject('no data')
    }
    const {respCode, respData, errMsg} = raw
    respCode == 0 ? resolve(respData) : reject(errMsg)
  })
}
/* eslint-able eqeqeq */
export const isMock = true
