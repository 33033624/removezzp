<template lang="html">
  <div class='model-box' @touchmove.prevent.stop>
    <p class='model-filter'></p>
    <section class='model-contain'>
      <slot name='contain'></slot>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.model-box{
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .model-filter{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: black;
    opacity: 0.3;
  }
  .model-contain{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
</style>
