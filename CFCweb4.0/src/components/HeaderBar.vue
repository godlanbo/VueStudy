<template>
  <header class="site-header">
    <div class="head-left">
      <div class="shake-wrapper">
        CrazyForCode
      </div>
    </div>
    <el-menu
      class="head-right-menu"
      mode="horizontal"
      text-color="#24292e"
      :default-active="activeMenu"
      router
    >
    <!-- 
      text-color="#f2f9e1"
      background-color="#9cb198"
      active-text-color="#322e23"

      text-color="#fff"
      background-color="#24292e"
      active-text-color="#fff"
    -->
      <el-menu-item class="menu-item" index="/home">Home</el-menu-item>
      <el-menu-item class="menu-item" index="3">
        <a href="https://www.crazyforcode.org" target="_blank">Blog</a>
      </el-menu-item>
      <el-menu-item class="menu-item" index="/time-base">TimeBase</el-menu-item>
      <el-menu-item class="menu-item" index="/team">Team</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
export default {
  name: "HeadBar",
  data() {
    return {
      preScrollTop: 0
    }
  },
  computed: {
    activeMenu() {
      return this.$route.path
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
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Lato);
@import url(https://fonts.googleapis.com/css?family=Seymour+One&display=swap);
.site-header {
  top: 0;
  display: flex;
  justify-content: flex-start;
  height: 60px;
  width: 100%;
  position: fixed;
  z-index: 999;
  opacity: 1;
  transition: 0.5s ease,top 0.5s ease;
  box-shadow: 0 0 30px 0 rgba(32,39,48,.08);
  /* border-bottom: 1px solid #dfdede; */
  /* background-color: #24292e; */
  background-color: white;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 15px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  }
}
.head-left {
  line-height: 60px;
   flex-grow: 1;
}
.head-right-menu .menu-item {
  font-family: 'Seymour One', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  padding-top: 18px;
  font-weight: 500;
}
.head-right-menu .menu-item a{
  text-decoration: none;
  vertical-align: inherit;
}
</style>
<style>
@import url(https://fonts.googleapis.com/css?family=Seymour+One&display=swap);
@keyframes shake {
  10% {
    transform:translate(-0.5px,1.5px) rotate(0.5deg);
    border-color: #4285f4;
  }
  20% {
    transform:translate(-0.5px,1.5px) rotate(-0.5deg);
    border-color: #ea4335;
  }
  30% {
    transform:translate(-2.5px,-1.5px) rotate(0.5deg);
    border-color: #f9ab00;
  }
  40% {
    transform:translate(-2.5px,-2.5px) rotate(-1.5deg);
    border-color: #34a853;
  }
  50% {
    transform:translate(1.5px,1.5px) rotate(-1.5deg);
    border-color: #4285f4;
  }
  60% {
    transform:translate(-2.5px,-0.5px) rotate(-0.5deg);
    border-color: #ea4335;
  }
  70% {
    transform:translate(1.5px,-2.5px) rotate(-0.5deg);
    border-color: #f9ab00;
  }
  80% {
    transform:translate(0.5px,1.5px) rotate(0.5deg);
    border-color: #34a853;
  }
  90% {
    transform:translate(-2.5px,-0.5px) rotate(0.5deg);
    border-color: #4285f4;
  }
  100% {
    transform:translate(-0.5px,-0.5px) rotate(-1.5deg);
    border-color: #ea4335;
  }
}
@keyframes shakeBorder {
  10% {
    border-color:#ff9292;
  }
  20% {
    border-color:#f09eff;
  }
  30% {
    border-color:#9397ff;
  }
  40% {
    border-color:#9fb8ff;
  }
  50% {
    border-color:#9fd7ff;
  }
  60% {
    border-color:#9fffd2;
  }
  70% {
    border-color:#dfff9f;
  }
  80% {
    border-color:#ffd49f;
  }
  90% {
    border-color:#ffc29f;
  }
  100% {
    border-color:#ffa198;
  }
}
@keyframes shakeText {
  25% {
    color: #4285f4;
  }
  50% {
    color: #ea4335;
  }
  75% {
    color: #f9ab00;
  }
  100% {
    color: #34a853;
  }
}
.shake-wrapper:hover {
  animation: shake 0.3s linear infinite,shakeText 1s linear infinite;
}
.shake-wrapper {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Seymour One', sans-serif;
  display: inline-table;
  margin-left: 30px;
  height: 36px;
  line-height: 36px;
  border: 2px solid #000;
  padding: 0px 10px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  animation: shakeBorder 20s linear infinite;
}
abbr span {
  text-decoration: underline #322e23;
  transition: all 0.5s ease-in-out;
}
abbr span.hidden {
  max-width: 0;
  text-decoration: none;
  opacity: 0;
}
abbr:hover span {
  max-width: 2em;
  text-decoration: none;
  opacity: 1;
  color: #f2f9e1;
}
abbr:hover span.initial {
  margin-left: 0.2em;
  color: #322e23;
}
</style>