<template>
  <div id="app">
    <home-header></home-header>
    <div class="temp"></div>
    <home-swiper></home-swiper>
  </div>
</template>
<script>
import HomeSwiper from '@/views/swiper/Swiper'
import HomeHeader from '@/views/Head/HeadBar'
export default {
  name: "app",
  components: {
    HomeSwiper,
    HomeHeader
  },
  data() {
    return {
      
    }
  },
  mounted() {
    const loading = document.querySelector('.loading-wrapper')
    setTimeout(() => {
      loading.style.display = 'none'
    }, 1100)
    loading.style.opacity = 0
    document.querySelector('#app').className = 'active'
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
.temp {
  height: 100px;
}
</style>
