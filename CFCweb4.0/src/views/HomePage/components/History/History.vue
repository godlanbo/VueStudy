<template>
  <div class="history-content-wrapper">
    <div class="left-content-wrapper">
      <detail-swiper></detail-swiper>
    </div>
    <div class="right-content-wrapper">
      <div class="info">
        <h3>History</h3>
        <p>
          CFC团队成立于2013年1月，是重庆理工大学第一支完全由学生自主创立的计
          算机实验室。团队最初由三位热爱Web技术，渴望交流的学长组建，经过多年
          的发展，团队不断壮大，成员们的学习方向也不再局限于Web。CFC已经成为重
          理工最大的的极客聚居地之一，并创造了多个校史第一。CFC一直秉承Crazy
          ForCode的理念，为校内热爱技术、乐于学习的学子提供一个舒适的Coding环
          境和优秀的交流平台。在这里，遇见志同道合的朋友，交流技术与心得，碰撞思
          维的火花，成为更好的自己！
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import DetailSwiper from './components/DetailSwiper'
export default {
  name: 'History',
  components: {
    DetailSwiper
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