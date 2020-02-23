<template>
  <div :class="['divide-line', isTop ? 'grayTop' : 'grayBottom']"></div>
</template>
<script>
export default {
  name: 'DivideLine',
  props: {
    isTop: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.divide-line.grayTop {
  background: url(/images/gray_terminator_top.png) repeat-x 50%;
  background-size: 70px;
  height: 35px;
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 10;
}
.divide-line.grayBottom {
  background: url(/images/gray_terminator_bottom.png) repeat-x 50%;
  background-size: 70px;
  height: 35px;
  position: absolute;
  bottom: -35px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 10;
}
</style>