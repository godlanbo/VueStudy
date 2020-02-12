<template>
  <div class="swiper-bar">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(page ,index) in pages" :key="index" class="team-wrapper swiper-no-swiping">
        <member
          @edit-member="handleEditMember"
          @delete-member="handleDeleteMember"
          v-for="(item, index) in page"
          :key="index"
          :memberInfo="item"></member>
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
import Member from './components/Member'
export default {
  name: "Swiper",
  components: {
    swiper,
    swiperSlide,
    Member
  },
  props: {
    memberInfo: Array
  },
  computed: {
    pages() {
      let pages = []
      this.memberInfo.forEach((item, index) => {
        const page = Math.floor(index / 3)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  data() {
    return {
      swiperOption: {
        noSwiping : true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
    }
  },
  methods: {
    findActiveIndex(name) {
      const index = this.memberInfo.findIndex(item => {
        return item.name === name
      })
      return index
    },
    handleEditMember(name) {
      // console.log(this.$refs.mySwiper.swiper)
      this.$emit('edit-member', this.findActiveIndex(name))
    },
    handleDeleteMember(name) {
      const indexInActivePages = this.pages[this.swiper.activeIndex].findIndex(item => {
        return item.name === name
      })
      this.$emit('delete-member', this.findActiveIndex(name), indexInActivePages)
    }
  }
}
</script>
<style scoped>
.swiper-bar {
  position: relative;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 50px;
}
.swiper-button-prev,
.swiper-button-next {
  top: 40%;
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