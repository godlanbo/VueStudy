<template>
  <div class="backTop" @click="handleBackTop">
    <i class="el-icon-caret-top"></i>
  </div>
</template>
<script>
export default {
  name: 'BackTop',
  methods: {
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const backTop = document.querySelector('.backTop')
      if (scrollTop > 200) {
        backTop.style.visibility = 'visible'
        backTop.style.opacity = 1
      } else {
        backTop.style.visibility = 'hidden'
        backTop.style.opacity = 0
      }
    },
    handleBackTop() {
      var step = 0
      var gotoTop= function(){
        var scrollTop  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 0) {
          step += 10
          scrollTop -= step
          window.scrollTo(0, scrollTop);
        } else {
          clearInterval(timer);
          timer = null;
        }
      }
      var timer=setInterval(gotoTop, 20);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
.backTop {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  background-color: #fff;
  color: gray;
  bottom: 100px;
  right: 40px;
  z-index: 20;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1),
    2px 0 12px 0 rgba(0,0,0,.1),-2px 0 12px 0 rgba(0,0,0,.1),
    0 -2px 12px 0 rgba(0,0,0,.1);
  cursor: pointer;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}
</style>