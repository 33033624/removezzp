import { get } from 'utils/ajax.js'

const apiPrefix = '//ypactivity.58.com/tag'

export const apply = (uid = '123456789') => get(`${apiPrefix}/application`, {uid}, {cors: false})

export const getState = (uid = '987654321') => get(`${apiPrefix}/state`, {uid}, {cors: false})
