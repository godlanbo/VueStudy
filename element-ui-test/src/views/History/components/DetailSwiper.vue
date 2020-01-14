<template>
  <div>
    <!-- <div class="left-content-wrapper"></div>
    <div class="right-content-wrapper"></div> -->
    <swiper :options="swiperOption" class="detail-swiper">
      <swiper-slide>
        <div class="history-item">
          <img src="https://balloonary.io/example_1.jpg">
          <div class="content">
            <div class="title">2020.1.14</div>
            <div class="description">CFC成立第七周年</div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="history-item">
          <div class="img"></div>
          <div class="content">123</div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="history-item">
          <div class="img"></div>
          <div class="content">123</div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </div>
      <div class="swiper-button-next" slot="button-next">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"
export default {
  name: 'DetailHistory',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-swiper {
  position: relative;
  width: 55%;
  // text-align: center;
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
}
.swiper-button-prev,
.swiper-button-next {
  border: 1px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  box-shadow: 0 1px 1.5px 0 rgba(0,0,0,.12), 0 1px 1px 0 rgba(0,0,0,.24);
  background-image: none;
  transition: transform 0.6s,box-shadow 0.6s;
}
.swiper-button-prev:hover,
.swiper-button-next:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 10px 0 rgba(0,0,0,.19), 0 6px 3px 0 rgba(0,0,0,.23)
}
</style>