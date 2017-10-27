<template>
  <div class="activity" @click="skipToUrl(href)">
    <Swipe :picList="picList" @sw-cur="updateIdx"></Swipe>
  </div>
</template>

<script>
  import Swipe from '@zz-yp/vue-ui-lib/dist/swipe'
  import native from '@zz-yp/native-adapter'
  export default {
    props: ['activityBanner'],
    data () {
      return {
        swipeIdx: 0
      }
    },
    methods: {
      updateIdx (idx) {
        this.swipeIdx = idx
      },
      skipToUrl (href) {
        native.skipToUrl({targetUrl: href})
      }
    },
    computed: {
      picList () {
        const res = []
        this.activityBanner.map(item => {
          res.push(item.image)
        })
        return res
      },
      hrefs () {
        const res = []
        this.activityBanner.map(item => {
          res.push(item.url)
        })
        return res
      },
      href () {
        const { swipeIdx, hrefs } = this
        return hrefs[swipeIdx]
      }
    },
    components: {
      Swipe: Swipe
    }
  }
</script>
<style lang="scss" scoped>
  .activity{
    width: pxToRem(750px);
    height: pxToRem(300px);
    margin-top: pxToRem(20px);
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    @include font-dpr(36px);
    color: #b4b8c2;
    background-size: cover;
    background-position: center;
  }
</style>
