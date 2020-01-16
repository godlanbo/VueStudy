<template>
  <div id="app">
    <home-header></home-header>
    <home-detail></home-detail>
    <div class="history-wrapper">
      <home-history></home-history>
      <divide-line></divide-line>
    </div>
    <studio-info></studio-info>
    <div class="home-swiper-wrapper">
      <home-swiper></home-swiper>
    </div>
  </div>
</template>
<script>
import HomeSwiper from '@/views/swiper/Swiper'
import HomeHeader from '@/views/Head/HeadBar'
import HomeDetail from '@/views/Introduction'
import HomeHistory from '@/views/History/History'
import DivideLine from '@/components/DivideLine'
import StudioInfo from '@/views/StudioInfo/StudioInfo'
export default {
  name: "app",
  components: {
    HomeSwiper,
    HomeHeader,
    HomeDetail,
    HomeHistory,
    DivideLine,
    StudioInfo
  },
  data() {
    return {
      preScrollTop: 0
    }
  },
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const diff = scrollTop - this.preScrollTop
      const headerBar = document.querySelector('.site-header')
      if (diff > 0) {
        headerBar.style.top = '-65px'
      } else {
        headerBar.style.top = '0'
      }
      this.preScrollTop = scrollTop
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    const loading = document.querySelector('.loading-wrapper')
    setTimeout(() => {
      loading.style.display = 'none'
    }, 1100)
    loading.style.opacity = 0
    document.querySelector('#app').className = 'active'
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss">
html, body, h1, h2, h3, h4, h5, h6, p, blockquote, button, dd, div, dl, dt, form, li, ol, p, pre, td, th, ul {
  margin: 0px;
  padding: 0px;
}
.test {
  height: 500px;
}
#app {
  min-width: 1250px;
  opacity: 0;
  transition: opacity 1s ease;
  hr {
    margin: 0 auto;
    border-bottom-color: #eee;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
  }
  &.active {
    opacity: 1;
  }
  .history-wrapper {
    background-color: #f0f0f0;
    position: relative;
  }
  .home-swiper-wrapper {
    position: relative;
    background-color: white;
  }
}

</style>
