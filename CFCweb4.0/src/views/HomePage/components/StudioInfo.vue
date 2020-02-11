<template>
  <div class="studioInfo-wrapper">
    <div class="studio-left-content">
      <div class="the-studioInfo">
        <h3>Studio</h3>
        <p>{{text}}</p>
      </div>
    </div>
    <div class="studio-right-content">
      <div class="vueWaterfallEasy-wrapper">
        <div class="vueWaterfallEasy-content-wrapper">
          <vue-waterfall-easy
            ref="waterfall"
            @scrollReachBottom="cancelGetData"
            :imgsArr="imgsArr"
            :maxCols="3"
            :imgWidth="190"
            :gap="5"
          >
            <!-- <template class="img-info" v-slot="props">
              <p class="some-info">第{{props.index+1}}张图片</p>
              <p class="some-info">something</p>
            </template> -->
          </vue-waterfall-easy>
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
  props: {
    imgsArr: Array
  },
  data() {
    return {
      text: `我们一直秉承 Crazy For Code 的理念，为校内热爱技术、积极进取的
      学子提供一个舒适的 Coding 环境和高质量的交流平台。在 CFC，你可以找到志
      同道合的朋友，一起钻研技术，一起学习进步；也可以在每周例行的交流会上与学
      习方向迥异的小伙伴交流想法，碰撞出伟大的 idea。`.replace(/\s/g, '')
    }
  },
  methods: {
    cancelGetData() {
       this.$refs.waterfall.waterfallOver()
    }
  }
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
  .studio-right-content {
    width: 50%;
    float: right;
    padding: 10% 5% 15% 0;
    // padding: 10% 2% 15% 5%;
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
        // width: 631px;
        width: calc(100% + 18px);
        margin: 0 auto;
        // padding-right: 4px;
      }
    }
  }
}
</style>
<style>
.vue-waterfall-easy {
  /* left: 47% !important; */
  margin-left: -292px !important;
}
</style>