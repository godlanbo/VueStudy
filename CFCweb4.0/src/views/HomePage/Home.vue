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
        <p>{{text}}</p>
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
      teamInfo: [],
      text: `多才多艺，特立独行的成员们是 CFC 实验室最宝贵的财
      富。CFC 给每一位成员充足的资源支撑和广阔的发展空间，这里
      有来自未来的人工智能大科学家，有魅力四射的音乐人，有沉稳先
      进的思想者，还有活跃在中国一线互联网厂商的众多技术大佬，以
      及充满无尽可能的你！`.replace(/\s/g, '')
    }
  },
  created() {
    getHomeData().then(response => {
      const data = response.data.data
      this.historyInfo = data.timebase
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
  opacity: 1;
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
