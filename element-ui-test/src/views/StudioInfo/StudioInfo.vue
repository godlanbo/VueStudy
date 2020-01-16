<template>
  <div class="studioInfo-wrapper">
    <div class="studio-left-content">
      <div class="the-studioInfo">
        <h3>Studio</h3>
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
    <div class="studio-right-content">
      <div class="vueWaterfallEasy-wrapper">
        <div class="vueWaterfallEasy-content-wrapper">
          <vue-waterfall-easy
            :imgsArr="imgsArr"
            :maxCols="2"
            :imgWidth="200"
          ></vue-waterfall-easy>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'StudioInfo',
  components: {
    vueWaterfallEasy
  },
  data() {
    return {
      imgsArr: [{
        src: 'http://localhost:8089/img/4250ccb2ff931408ea4cb61d9e3ec29f.jpeg',
        href: 'https://www.baidu.com'
      }, {
        src: 'http://localhost:8089/img/4250ccb2ff931408ea4cb61d9e3ec29f.jpeg',
        href: 'https://www.baidu.com'
      }, {
        src: 'http://localhost:8089/img/4250ccb2ff931408ea4cb61d9e3ec29f.jpeg',
        href: 'https://www.baidu.com'
      }, {
        src: 'http://localhost:8089/img/4250ccb2ff931408ea4cb61d9e3ec29f.jpeg',
        href: 'https://www.baidu.com'
      }, {
        src: 'http://localhost:8089/img/4250ccb2ff931408ea4cb61d9e3ec29f.jpeg',
        href: 'https://www.baidu.com'
      }, {
        src: 'http://localhost:8089/img/4250ccb2ff931408ea4cb61d9e3ec29f.jpeg',
        href: 'https://www.baidu.com'
      }]
    }
  },
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
.studioInfo-wrapper {
  position: relative;
  overflow: hidden;
  height: 722px;
  width: 90%;
  margin: 0 auto;
  .studio-left-content {
    float: left;
    width: 50%;
    .the-studioInfo {
      padding: 20% 10% 15% 5%;
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
          weight: 200;
        }
      }
    }
  }
  .studio-right-content {
    width: 45%;
    float: right;
    padding: 10% 5% 15% 0;
    .vueWaterfallEasy-wrapper {
      overflow: hidden;
      border-radius: 16px;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1),
      2px 0 12px 0 rgba(0,0,0,.1),-2px 0 12px 0 rgba(0,0,0,.1),
      0 -2px 12px 0 rgba(0,0,0,.1);
      position: relative;
      height: 500px;
      .vueWaterfallEasy-content-wrapper {
        height: 500px;
        width: 631px;
        margin: 0 auto;
        padding-right: 10px;
      }
    }
  }
}
</style>
<style>
/* .vue-waterfall-easy {
  left: 40% !important;
} */
</style>