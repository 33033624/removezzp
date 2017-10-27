function getUrlParameter (name) {
  let reg = new RegExp('(\\?|&)' + name + '=([^&]*)' + '(&|$)')
  let arr = window.location.search.match(reg)
  if (arr != null) {
    return decodeURI(arr[2])
  }
  return null
}
export {getUrlParameter}
