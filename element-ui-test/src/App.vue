<template>
  <div id="app">
    <home-header></home-header>
    <home-detail></home-detail>
    <div class="home-swiper-wrapper">
      <home-swiper></home-swiper>
    </div>
    
  </div>
</template>
<script>
import HomeSwiper from '@/views/swiper/Swiper'
import HomeHeader from '@/views/Head/HeadBar'
import HomeDetail from '@/views/Introduction'
export default {
  name: "app",
  components: {
    HomeSwiper,
    HomeHeader,
    HomeDetail
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
<style>
html, body, h1, h2, h3, h4, h5, h6, p, blockquote, button, dd, div, dl, dt, form, li, ol, p, pre, td, th, ul {
  margin: 0px;
  padding: 0px;
}
#app {
  opacity: 0;
  transition: opacity 1s ease;
}
#app.active {
  opacity: 1;
}
.home-swiper-wrapper {
  position: relative;
  background-color: white;
}
</style>
