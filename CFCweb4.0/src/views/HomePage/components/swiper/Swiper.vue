<template>
  <div class="swiper-bar">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page ,index) in pages" :key="index" class="team-wrapper">
        <member v-for="(item, index) in page" :key="index" :memberInfo="item"></member>
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
    }
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      // {
      //   imgUrl: 'https://thatgamecompany.com/wp-content/uploads/thatgamecompany-team-jenova.jpg',
      //   name: '王辉宇',
      //   designation: '三爷',
      //   detail: '机器学习爱好者，后端开发，多语言大佬；“我不是天生旺仔，我只是天生爱笑”是他的名言'
      // }, {
      //   imgUrl: 'https://thatgamecompany.com/wp-content/uploads/thatgamecompany-team-jenova.jpg',
      //   name: '陈斌',
      //   designation: 'dbg',
      //   detail: '传说中大名鼎鼎的 ：CFC团队钦定负责人 · Markdown Boy · 人工智能大科学家 · 茶道爱好者 · uwp隐藏开发者 · acm天赋选手 · 一个顶两个 · 拯救重庆算法 · 理工的卡丽熙 · 竹轩女权的解放者 · 花溪全境守护 · 不蠢者 · 肩负未来人类前进使命的微弱 小葱拌豆腐吞噬者大斌哥'
      // }, {
      //   imgUrl: 'https://thatgamecompany.com/wp-content/uploads/thatgamecompany-team-jenova.jpg',
      //   name: '谢锦涛',
      //   designation: '涛哥',
      //   detail: '学霸涛，机器学习大佬，做事非常认真，持家的好男人'
      // }
    }
  },
  methods: {
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