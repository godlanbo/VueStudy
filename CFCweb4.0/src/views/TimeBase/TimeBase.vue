<template>
  <div id="timebase">
    <div class="content-title-wrapper">
      <div class="content-title">我们在这里相知相识，故事从未停止</div>
    </div>
    <div class="transition-img-wrapper">
      <img src="http://localhost:8089/img/1.JPG">
    </div>
  </div>
</template>
<script>
export default {
  name: 'TimeBase'
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
#timebase {
  .content-title-wrapper {
    padding-top: 140px;
    position: relative;
    width: 90%;
    margin: 0 auto;
    .content-title {
      text-align: center;
      font: {
        size: 58px;
        family: "Google Sans Display", Arial, Helvetica, sans-serif;
        weight: 400;
      }
    }
  }
  .transition-img-wrapper {
    text-align: center;
    width: 80%;
    margin: 80px auto 0;
    img {
      width: 100%;
      border-radius: 20px;
    }
  }
}
</style>