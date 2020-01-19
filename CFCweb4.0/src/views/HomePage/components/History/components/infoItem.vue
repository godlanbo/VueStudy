<template>
  <div class="history-item">
    <img :src="historyInfo.imgUrl">
    <div class="content">
      <div class="title">{{historyInfo.title}}</div>
      <div class="description">{{historyInfo.description}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InfoItem',
  props: {
    historyInfo: Object
  }
}
</script>
<style lang="scss" scoped>
.history-item {
  background-color: #fff;
  height: 580px;
  margin-top: 16px;
  margin-bottom: 80px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  width: 81%;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  img {
    object-fit: cover;
    height: 203px;
    clip-path: circle(290% at 50% -270%);
  }
  .content {
    margin-top: 15px;
    padding: 48px 32px;
    padding-top: 24px;
    .title {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 12px;
      font-family: Open Sans,sans-serif;
    }
    .description {
      font-size: 16px;
      line-height: 28px;
      font-family: Open Sans,sans-serif;
      font-weight: 400;
    }
  }
}
</style>