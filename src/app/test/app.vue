<template lang="html">
  <div class='wrap'>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  created () {
    this.$store.dispatch('SET_TEST_STATE').then(json => {
      console.log('test =======> dispath触发请求， 并且返回action参数', json)
    })
  },
  mounted () {
    // 直接获取对应的 test_state
    const TEST_STATE = this.$store.state.test_state
    console.log('TEST_STATE ====>', TEST_STATE)
    console.log('computed ===> this.test ', this.test)
  },
  computed: {
    //  映射text_state 为computed的test的值
    ...mapState({
      test: 'test_state'
    })
  }
}
</script>

<style lang="scss" scoped>
 body,html{
   width: 100%;
 }
 .wrap{
   width: 100%;
   height: 100%;
 }
</style>
