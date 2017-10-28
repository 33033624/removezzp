// vuex test
export const SET_TEST_STATE = ({dispatch, commit}) => {
  // 最具有灵活性的地方
  const test = 'test'
  // commit 会直接触发mutations 改变state变化
  commit('SET_TEST_STATE', test)

  // dispatch 通常是处理异步
  dispatch('TEST_DISPATCH', 'test').then(json => {
    commit('SET_TEST_STATE', json)
  })

  // 如果不需要进行状态改变 可以直接暴露到页面中  test/app.vue
  return new Promise((resolve, reject) => {
    resolve('test dispatch promise')
  })
}
export const TEST_DISPATCH = ({dispatch, commit}, arg) => {
  return new Promise((resolve, reject) => {
    if (arg === 'test') {
      resolve('test success')
    } else {
      reject((new Error('test failed')))
    }
  })
}
