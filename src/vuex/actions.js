// littleB price
export const GET_JIXING_LIST = ({dispatch, commit}) => {
  const list = [1, 2, 3, 3, 4, 4, 5, 5, 5]
  console.log('this 123444')
  commit('SET_JIXING', list)
  return new Promise((resolve, reject) => {
    resolve(list)
  })
}
