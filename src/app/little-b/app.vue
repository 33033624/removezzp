<template lang="html">
  <div class='wrap'>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('GET_JIXING_LIST').then(json => {
      console.log(json)
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
