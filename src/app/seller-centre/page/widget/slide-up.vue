<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: transform 2s;
}
.fade-leave-to {
  transform: translateY(-100%);
}
.fade-enter {
  transform: translateY(100%);
}
.fade-enter-to {
  transform: translateY(0);
}
</style>
