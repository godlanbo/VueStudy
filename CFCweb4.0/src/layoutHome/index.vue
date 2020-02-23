<template>
  <div id="layout">
    <back-top></back-top>
    <join-us></join-us>
    <header-bar></header-bar>
    <transition name="fade">
      <router-view />
    </transition>
    <div class="footer-wrapper">
      <div class="logo">
        <img src="@/assets/logo.png">
      </div>
      <div class="copyrigth-wrapper">
        <div class="author">
          <span style="color: #322e23">Crazy </span><span style="color: #9cb198">For </span><span style="color: #88857d">Code</span>
        </div>
        <div class="copyrigth">© 2013-2020 CrazyForCode Studio, All Rights Reserved.</div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/HeaderBar'
import BackTop from '@/components/BackTop'
import JoinUs from '@/components/JoinUs'
export default {
  name: 'Layout',
  components: {
    HeaderBar,
    BackTop,
    JoinUs
  },
  mounted() {
    const loading = document.querySelector('.loading-wrapper')
    setTimeout(() => {
      loading.style.display = 'none'
    }, 1100)
    loading.style.opacity = 0
  }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Nunito:900&display=swap);
#layout {
  display: flex;
  flex-direction: column;
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: opacity 1s ease;
  }
  .footer-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-start;
    padding: 25px;
    padding-top: 50px;
    margin-bottom: 55px;
    height: 100px;
    .logo {
      width: 50%;
      padding-left: 150px;
      img {
        width: 40%;
      }
    }
    .copyrigth-wrapper {
      padding: 15px;
      text-align: center;
      .author {
        margin-bottom: 10px;
        font: {
          size: 30px;
          family: 'Nunito', sans-serif;
          weight: 900;
          style: normal;
        }
      }
      .copyrigth {
        font: {
          family: "Google Sans",Arial,Helvetica,sans-serif;
          weight: 400;
          size: 15px;
        }
      }
    }
  }
}
</style>