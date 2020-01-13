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
      text-color="#24292e"
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
@import url(https://fonts.googleapis.com/css?family=Seymour+One&display=swap);
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
    0 3.7px 7.3px rgba(0, 0, 0, 0.277);/* 0 10px 20px rgba(0, 0, 0, 0.4); */
  /* border-bottom: 1px solid #dfdede; */
  /* background-color: #24292e; */
  background-color: white;
  backdrop-filter: blur(30px);
}
.site-header:hover {
  box-shadow: 0 0.7px 1px rgba(0, 0, 0, 0.157),
    0 1.7px 2.6px rgba(0, 0, 0, 0.224), 0 3.5px 5.3px rgba(0, 0, 0, 0.28),
    0 7.3px 11px rgba(0, 0, 0, 0.346); /* 0 20px 30px rgba(0, 0, 0, 0.5); */
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
  font-family: 'Seymour One', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  padding-top: 18px;
  font-weight: 500;
  /* font-weight: bold; */
}
/* .head-right-menu .menu-item:hover {
  color: #aeb3b8 !important;
} */
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
    /* border-color:#ffbebe; */
    border-color: #4285f4;
  }
  20% {
    transform:translate(-0.5px,1.5px) rotate(-0.5deg);
    /* border-color:#ffdebe; */
    border-color: #ea4335;
  }
  30% {
    transform:translate(-2.5px,-1.5px) rotate(0.5deg);
    /* border-color:#fff3be; */
    border-color: #f9ab00;
  }
  40% {
    transform:translate(-2.5px,-2.5px) rotate(-1.5deg);
    /* border-color:#eeffbe; */
    border-color: #34a853;
  }
  50% {
    transform:translate(1.5px,1.5px) rotate(-1.5deg);
    /* border-color:#f3ffbe; */
    border-color: #4285f4;
  }
  60% {
    transform:translate(-2.5px,-0.5px) rotate(-0.5deg);
    /* border-color:#e9ffbe; */
    border-color: #ea4335;
  }
  70% {
    transform:translate(1.5px,-2.5px) rotate(-0.5deg);
    /* border-color:#d0ffbe; */
    border-color: #f9ab00;
  }
  80% {
    transform:translate(0.5px,1.5px) rotate(0.5deg);
    /* border-color:#beffde; */
    border-color: #34a853;
  }
  90% {
    transform:translate(-2.5px,-0.5px) rotate(0.5deg);
    /* border-color:#beefff; */
    border-color: #4285f4;
  }
  100% {
    transform:translate(-0.5px,-0.5px) rotate(-1.5deg);
    /* border-color:#bed8ff; */
    border-color: #ea4335;
  }
}
@keyframes shakeText {
  10% {
    color:#ff9292;
  }
  20% {
    color:#f09eff;
  }
  30% {
    color:#9397ff;
  }
  40% {
    color:#9fb8ff;
  }
  50% {
    color:#9fd7ff;
  }
  60% {
    color:#9fffd2;
  }
  70% {
    color:#dfff9f;
  }
  80% {
    color:#ffd49f;
  }
  90% {
    color:#ffc29f;
  }
  100% {
    color:#ffa198;
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
@keyframes test {
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
@keyframes testBorder {
  25% {
    border-color: #4285f4;
  }
  50% {
    border-color: #ea4335;
  }
  75% {
    border-color: #f9ab00;
  }
  100% {
    border-color: #34a853;
  }
}
.shake-wrapper {
  margin-left: 30px;
}
.shake-wrapper .shake-logo:hover {
  animation: shake 0.3s linear infinite,test 1s linear infinite;
}
.shake-wrapper .shake-logo {
  color: #000;
  /* color: #fff; */
  font-size: 16px;
  font-weight: 500;
  font-family: 'Seymour One', sans-serif;
  width: 55%;
  height: 36px;
  line-height: 36px;
  border: 2px solid #000;
  /* border: 2px solid #fff; */
  padding: 0px 10px;
  padding-left: 7px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  /* animation: shakeBorder 20s linear infinite; */
  animation: testBorder 20s linear infinite;
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