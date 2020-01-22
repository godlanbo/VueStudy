<template>
  <div id="timebase">
    <div class="content-title-wrapper">
      <div class="content-title">我们在这里相知相识，故事从未停止</div>
    </div>
    <div class="transition-img-wrapper">
      <img src="http://localhost:8089/img/1.JPG">
    </div>
    <div class="timebase-content-wrapper">
      <timebase-item
        v-for="item in itemInfo"
        :key="item.title"
        :itemInfo="item"
      ></timebase-item>
    </div>
    <div class="test"></div>
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
      itemInfo: [{
        title: 2014,
        detailInfo: [{
          title: '1.14',
          content: '7周年',
          imgUrl: 'https://ooo.0o0.ooo/2016/09/07/57d027c54c85c.png'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }]
      }, {
        title: 2013,
        detailInfo: [{
          title: '1.14',
          content: '7周年',
          imgUrl: 'https://ooo.0o0.ooo/2016/09/07/57d027c54c85c.png'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }]
      }, {
        title: 2012,
        detailInfo: [{
          title: '1.14',
          content: '7周年',
          imgUrl: 'https://ooo.0o0.ooo/2016/09/07/57d027c54c85c.png'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }, {
          title: '1.14',
          content: '7周年'
        }]
      }]
    }
  },
  created() {
    getTimeBaseData().then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
    const loading = document.querySelector('.loading-wrapper')
    setTimeout(() => {
      loading.style.display = 'none'
    }, 1100)
    loading.style.opacity = 0
    // document.querySelector('#home').className = 'active'
  }
}
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
#timebase {
  .test {
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