<template>
  <div class="history-content-wrapper">
    <div class="left-content-wrapper">
      <detail-swiper :historyInfo="historyInfo"></detail-swiper>
    </div>
    <div class="right-content-wrapper">
      <div class="info">
        <h3>History</h3>
        <p>{{text}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import DetailSwiper from './components/DetailSwiper'
export default {
  name: 'History',
  props: {
    historyInfo: Array
  },
  components: {
    DetailSwiper
  },
  data() {
    return {
      text: `CFC 团队成立于 2013 年，是重庆理工大学第一支完全由学生自主创立的计算机实
      验室。团队最初由三位热爱 Web 技术，渴望交流的学长组建。经过多年的发展，团队不断
      壮大，历代继任者没有忘记 CFC 建立的初心，成员们的学习方向也不再局限于 Web。如今
      ，CFC 已经发展成为重理工最大的的极客聚居地之一，并创造了多个校史第一。`.replace(/\s/g, '')
    }
  }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
.history-content-wrapper {
  position: relative;
  height: 722px;
  width: 90%;
  margin: 0 auto;
  .left-content-wrapper {
    margin-top: 50px;
    display: inline-block;
    width: 50%;
    position: relative;
    vertical-align: top;
    .learn-more {
      position: relative;
    }
  }
  .right-content-wrapper {
    margin: 0;
    display: inline-block;
    width: 50%;
    vertical-align: top;
    position: relative;
    .info {
      padding: 15% 15% 15% 0;
      color: #153344;
      h3 {
        font: {
          size: 48px;
          family: "Open Sans script=all rev=1", "Adobe Blank";
          weight: blod;
        }
      }
      p {
        margin-top: 40px;
        font: {
          size: 24px;
          family: "Open Sans script=all rev=1", "Adobe Blank";
          weight: 300;
        }
      }
    }
  }
}
</style>