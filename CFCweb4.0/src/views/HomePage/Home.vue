<template>
  <div id="home">
    <home-detail></home-detail>
    <div class="history-wrapper">
      <home-history :historyInfo="historyInfo"></home-history>
      <divide-line></divide-line>
    </div>
    <div class="studio-wrapper">
      <studio-info :imgsArr="studioInfo"></studio-info>
      <divide-line isTop></divide-line>
    </div>
    <div class="home-swiper-wrapper">
      <div class="teamInfo-wrapper">
        <h3>Our Team</h3>
        <p>
          CFC团队成立于2013年1月，是重庆理工大学第一支完全由学生自主创立的计
          算机实验室。团队最初由三位热爱Web技术，渴望交流的学长组建，经过多年
          的发展，团队不断壮大，成员们的学习方向也不再局限于Web。CFC已经成为重
          理工最大的的极客聚居地之一，并创造了多个校史第一。
        </p>
      </div>
      <home-swiper :memberInfo="teamInfo"></home-swiper>
      <divide-line></divide-line>
    </div>
  </div>
</template>
<script>
import HomeSwiper from './components/swiper/Swiper'
import HomeDetail from './components/Introduction'
import HomeHistory from './components/History/History'
import DivideLine from '@/components/DivideLine'
import StudioInfo from './components/StudioInfo'
import { getHomeData } from '@/api/home'
export default {
  name: "home",
  components: {
    HomeSwiper,
    HomeDetail,
    HomeHistory,
    DivideLine,
    StudioInfo
  },
  data() {
    return {
      historyInfo: [],
      studioInfo: [],
      teamInfo: []
    }
  },
  mounted() {
    // const loading = document.querySelector('.loading-wrapper')
    // setTimeout(() => {
    //   loading.style.display = 'none'
    // }, 1100)
    // loading.style.opacity = 0
    document.querySelector('#home').className = 'active'
  },
  created() {
    getHomeData().then(response => {
      console.log(response)
      const data = response.data.data
      this.historyInfo = data.timeBase
      this.studioInfo = data.imgs
      this.teamInfo = data.ourTeam
    }).catch(err => {
      console.log(err)
      this.$message({
        type: 'error',
        message: err.message
      })
    })
  }
}
</script>
<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
html, body, h1, h2, h3, h4, h5, h6, p, blockquote, button, dd, div, dl, dt, form, li, ol, p, pre, td, th, ul {
  margin: 0px;
  padding: 0px;
}
#home {
  min-width: 1250px;
  // display: flex;
  // flex-direction: column;
  // box-sizing: border-box;
  opacity: 0;
  transition: opacity 1s ease;
  &.active {
    opacity: 1;
  }
  .history-wrapper {
    background-color: #f0f0f0;
    position: relative;
  }
  .home-swiper-wrapper {
    position: relative;
    padding-top: 40px;
    padding-bottom: 20px;
    background-color: #f0f0f0;
    .teamInfo-wrapper {
      width: 40%;
      margin: 0 auto 80px;
      text-align: center;
      position: relative;
      color: #153344;
      h3 {
        font: {
          size: 40px;
          family: "Open Sans script=all rev=1", "Adobe Blank";
          weight: blod;
        }
      }
      p {
        margin-top: 40px;
        margin-bottom: 40px;
        font: {
          size: 24px;
          family: "Open Sans script=all rev=1", "Adobe Blank";
          weight: 300;
        }
      }
    }
  }
  .studio-wrapper {
    position: relative;
  }
}
</style>
