<template>
  <header class="site-header">
    <div class="head-left">
      <!-- <abbr data-title="Crazy For Code">CFC</abbr> -->
      <!-- <img src="@/assets/logo1.png" style="height: 60px; width: 200px;"> -->
      <div class="shake-wrapper">
        <div class="shake-logo">CrazyForCode</div>
      </div>
    </div>
    <el-menu
      class="head-right-menu"
      mode="horizontal"
      text-color="#fff"
      background-color="#24292e"
      active-text-color="#fff"
    >
    <!-- 
      text-color="#f2f9e1"
      background-color="#9cb198"
      active-text-color="#322e23"

      text-color="#fff"
      background-color="#24292e"
      active-text-color="#fff"
     -->
      <el-menu-item class="menu-item" index="1">Home</el-menu-item>
      <el-menu-item class="menu-item" index="3">
        <a href="https://www.crazyforcode.org" target="_blank">Blog</a>
      </el-menu-item>
      <el-menu-item class="menu-item" index="4">TimeBase</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
export default {
  name: "headBar",
  mounted() {
    // let abbr = document.querySelector("abbr")
    // abbr.textContent = ""
    // let title = abbr.dataset.title
    // let words = title.split(" ")
    // words.forEach(word => {
    //   let [initial, ...restLetters] = word.split("")
    //   let initialSpan = document.createElement("span")
    //   initialSpan.textContent = initial
    //   initialSpan.className = "initial"
    //   abbr.append(initialSpan)
    //   restLetters.forEach(letter => {
    //     let hiddenSpan = document.createElement("span")
    //     hiddenSpan.textContent = letter
    //     hiddenSpan.className = "hidden"
    //     abbr.append(hiddenSpan)
    //   })
    // })
  }
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato);
.site-header {
  top: 0;
  display: flex;
  height: 60px;
  width: 100%;
  position: fixed;
  z-index: 999;
  opacity: 1;
  transition: 0.5s ease,top 0.5s ease;
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
    0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
    0 3.7px 7.3px rgba(0, 0, 0, 0.277); /*0 10px 20px rgba(0, 0, 0, 0.4);*/
  background-color: #24292e;
  /* background-color: white; */
  backdrop-filter: blur(30px);
}
.site-header:hover {
  box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
    0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
    0 7.3px 11px rgba(0, 0, 0, 0.346); /*0 20px 30px rgba(0, 0, 0, 0.5);*/
}
.head-left {
  line-height: 60px;
  width: 20%;
}
.shake-wrapper .shake-logo {
  /* color: #000; */
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 55%;
  height: 34px;
  line-height: 34px;
  /* border: 2px solid #000; */
  border: 2px solid #fff;
  padding: 2px 10px;
  padding-top: 1px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}
.head-right-menu {
  margin-left: 50%;
  /* height: 100%; */
}
.head-right-menu .menu-item {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  font-size: 20px;
  line-height: 1.5;
  padding-top: 13px;
  font-weight: 500;
  /* font-weight: bold; */
}
.head-right-menu .menu-item:hover {
  color: #aeb3b8 !important;
}
.head-right-menu .menu-item a{
  text-decoration: none;
  vertical-align: inherit;
}
</style>
<style>
@keyframes test {
  10% {
    transform:translate(-0.5px,1.5px) rotate(0.5deg);
    border-color:#ffbebe;
  }
  20% {
    transform:translate(-0.5px,1.5px) rotate(-0.5deg);
    border-color:#ffdebe;
  }
  30% {
    transform:translate(-2.5px,-1.5px) rotate(0.5deg);
    border-color:#fff3be;
  }
  40% {
    transform:translate(-2.5px,-2.5px) rotate(-1.5deg);
    border-color:#eeffbe;
  }
  50% {
    transform:translate(1.5px,1.5px) rotate(-1.5deg);
    border-color:#f3ffbe;
  }
  60% {
    transform:translate(-2.5px,-0.5px) rotate(-0.5deg);
    border-color:#e9ffbe;
  }
  70% {
    transform:translate(1.5px,-2.5px) rotate(-0.5deg);
    border-color:#d0ffbe;
  }
  80% {
    transform:translate(0.5px,1.5px) rotate(0.5deg);
    border-color:#beffde;
  }
  90% {
    transform:translate(-2.5px,-0.5px) rotate(0.5deg);
    border-color:#beefff;
  }
  100% {
    transform:translate(-0.5px,-0.5px) rotate(-1.5deg);
    border-color:#bed8ff;
  }
}
.shake-wrapper {
  margin-left: 30px;
}
.shake-wrapper:hover {
  animation: test 0.3s linear infinite;
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