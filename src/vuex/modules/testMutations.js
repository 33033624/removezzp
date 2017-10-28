import {
  SET_TEST_STATE
} from '../motation-types'
export const testMutations = {
  [SET_TEST_STATE] (state, testState) {
    state.test_state = testState
  },
  nihao (state, teststate) {
    state.teststate = teststate
  }
}
