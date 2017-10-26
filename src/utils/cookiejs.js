const getCookie = (name) => {
  var parts = document.cookie.split(name + '')
  const len = parts.length
  return len === 2 ? decodeURI(parts.pop().split(';')[0]) : ''
}
const setCookie = (params) => {
  var cookie = ''
  for (var key in params) {
    cookie += params[key] ? `${key}=${params[key]};` : ' '
  }
  document.cookie = cookie
  return cookie
}
const hasCookie = (name) => {
  const cookie = getCookie(name)
  return Boolean(cookie)
}
export {getCookie, setCookie, hasCookie}
