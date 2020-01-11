<template>
  <header class="site-header">
    <div class="head-left">
      <abbr data-title="Crazy For Code">CFC</abbr>
    </div>
    <el-menu
      class="head-right-menu"
      mode="horizontal"
      text-color="#f2f9e1"
      background-color="#9cb198"
      active-text-color="#322e23"
    >
      <el-menu-item class="menu-item" index="1">HOME</el-menu-item>
      <el-menu-item class="menu-item" index="3">
        <a href="https://www.crazyforcode.org" target="_blank">BLOG</a>
      </el-menu-item>
      <el-menu-item class="menu-item" index="4">TIMEBASE</el-menu-item>
    </el-menu>
  </header>
</template>
<script>
export default {
  name: "headBar",
  mounted() {
    let abbr = document.querySelector("abbr")
    abbr.textContent = ""
    let title = abbr.dataset.title
    let words = title.split(" ")
    words.forEach(word => {
      let [initial, ...restLetters] = word.split("")
      let initialSpan = document.createElement("span")
      initialSpan.textContent = initial
      initialSpan.className = "initial"
      abbr.append(initialSpan)
      restLetters.forEach(letter => {
        let hiddenSpan = document.createElement("span")
        hiddenSpan.textContent = letter
        hiddenSpan.className = "hidden"
        abbr.append(hiddenSpan)
      })
    })
  }
}
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato);
.site-header {
  display: flex;
  height: 60px;
  width: 100%;
  position: fixed;
  z-index: 999;
  opacity: 1;
  transition: 0.5s ease;
  box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126),
    0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224),
    0 3.7px 7.3px rgba(0, 0, 0, 0.277); /*0 10px 20px rgba(0, 0, 0, 0.4);*/
  background-color: #9cb198;
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
.head-right-menu {
  margin-left: 50%;
  /* height: 100%; */
}
.head-right-menu .menu-item {
  font-family: Lato, sans-serif;
  font-size: 24px;
  font-weight: bold;
}
.head-right-menu .menu-item a{
  text-decoration: none;
  vertical-align: inherit;
}
.head-left abbr {
  display: flex;
  margin-left: 60px;
  color: #322e23;
  font-size: 2.5em;
  font-weight: bold;
  font-family: Lato, sans-serif;
  text-decoration: none;
}
</style>
<style>
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