<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper" class="detail-swiper">
      <swiper-slide v-for="(item, index) in historyInfo" :key="index">
        <info-item :historyInfo="item"></info-item>
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
import InfoItem from './infoItem'
export default {
  name: 'DetailHistory',
  components: {
    swiper,
    swiperSlide,
    InfoItem
  },
  props: {
    historyInfo: Array
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          slideChangeTransitionStart: () => {
            this.$emit('onSlideChange', this.activeIndex)
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    activeIndex() {
      return this.swiper.activeIndex
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes move {
  0% {}
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(8px);
    opacity: 0;
  }
}
.detail-swiper {
  position: relative;
  width: 68%;
  height: 610px;
}
.swiper-button-prev,
.swiper-button-next {
  top: 49%;
  border: 1px solid #dfe1e5;
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.04), 0 4px 8px 0 rgba(0,0,0,0.20);
  background-image: none;
  background-color: #fff;
  transition: transform 0.6s,box-shadow 0.6s;
}
.swiper-button-prev:hover,
.swiper-button-next:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 10px 0 rgba(0,0,0,.19), 0 6px 3px 0 rgba(0,0,0,.23)
}
</style>