<template>
  <div id="timebase">
    <div class="content-title-wrapper">
      <div class="content-title">我们在这里相知相识，故事从未停止</div>
    </div>
    <div class="transition-img-wrapper">
      <img src="/images/timebase.jpg">
    </div>
    <div class="timebase-content-wrapper">
      <timebase-item
        v-for="item in itemInfo"
        :key="item.title"
        :itemInfo="item"
      ></timebase-item>
    </div>
    <div class="fill-footer"></div>
  </div>
</template>
<script>
import TimebaseItem from './components/ContentItem'
import { getTimeBaseData } from '@/api/timebase'
export default {
  name: 'TimeBase',
  components: {
    TimebaseItem
  },
  data() {
    return {
      itemInfo: []
    }
  },
  created() {
    getTimeBaseData().then(response => {
      const data = response.data.data
      this.itemInfo = data
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
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
#timebase {
  opacity: 1;
  .fill-footer {
    height: 300px;
  }
  .content-title-wrapper {
    padding-top: 140px;
    position: relative;
    width: 90%;
    margin: 0 auto;
    .content-title {
      text-align: center;
      font: {
        size: 58px;
        family: "Google Sans Display", Arial, Helvetica, sans-serif;
        weight: 400;
      }
    }
  }
  .transition-img-wrapper {
    text-align: center;
    width: 80%;
    margin: 80px auto 0;
    img {
      width: 100%;
      border-radius: 20px;
    }
  }
}
</style>