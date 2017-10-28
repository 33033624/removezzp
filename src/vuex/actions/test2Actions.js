// vuex test
export const SET_TEST2_STATE = ({dispatch, commit}) => {
  // 最具有灵活性的地方
  const test = 'test2'
  // commit 会直接触发mutations 改变state变化
  commit('SET_TEST_STATE', test)

  // dispatch 通常是处理异步
  dispatch('TEST2_DISPATCH', 'test2').then(json => {
    commit('SET_TEST_STATE', json)
  })

  // 如果不需要进行状态改变 可以直接暴露到页面中  test/app.vue
  return new Promise((resolve, reject) => {
    resolve('test2 dispatch promise')
  })
}
export const TEST2_DISPATCH = ({dispatch, commit}, arg) => {
  return new Promise((resolve, reject) => {
    if (arg === 'test2') {
      resolve('test2 success')
    } else {
      reject((new Error('test2 failed')))
    }
  })
}
