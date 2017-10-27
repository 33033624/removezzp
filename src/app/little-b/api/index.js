import { get } from 'utils/ajax.js'

const host = '//ypactivity.58.com'

export const getActivityList = ({pageNum, pageSize}) => get(`${host}/zzactivity/activity/list?pageSize=${pageSize}&pageNum=${pageNum}`)

export const getActivityDetail = ({id}) => get(`${host}/zzactivity/activity/detail?id=${id}`)

export const searchPrice = ({activityId, modelId, capacity, buyChannel}) => get(`${host}/zzactivity/pricerule?activityId=${activityId}&modelId=${modelId}&capacity=${capacity}&buyChannel=${buyChannel}`)

export const getShangpinList = ({uid, activityId, pageNum, pageSize}) => get(`${host}/zzactivity/info/list?zzActivityId=${activityId}&uid=${uid}&pageNum=${pageNum}&pageSize=${pageSize}`)

export const getPinpaiList = () => get(`${host}/zzactivity/cate/brandlist`)

export const getJixingList = ({pinpaiId}) => get(`${host}/zzactivity/cate/modellist?brandId=${pinpaiId}`)

export const getAttrlist = ({modelId}) => get(`${host}/zzactivity/cate/attrlist?modelId=${modelId}`)

export const ypValidate = ({activityId, infoId, actPrice}) => get(`${host}/zzactivity/validate?activityId=${activityId}&infoId=${infoId}&actPrice=${actPrice}`)

export const infoApplyActivity = ({infoId, uid, activityId, actPrice}) => get(`//zhuanzhuan.58.com/zz/transfer/infoApplyActivity?infoId=${infoId}&uid=${uid}&activityId=${activityId}&actPrice=${actPrice}`)
