<template>
  <div id="app">
    <div class="backTop" @click="handleBackTop">
      <i class="el-icon-caret-top"></i>
    </div>
    <div
      class="join-us open"
      :class="{ active: !isOpen }"
      :style="visibilityOpen"
      @click="handleJoinUsOpen"
    >
      <svg
        t="1579271476486"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="3076" width="35" height="35"
      >
        <path
          d="M902.629053 885.005474h93.237894v-115.334737h-134.521263v-134.521263h-115.334737v123.850105c71.302737 26.138947 143.252211 56.751158 156.618106 126.005895z m-41.283369 0h41.283369c-13.365895-69.254737-85.315368-99.866947-156.564211-126.005895v10.671158h-134.521263v115.334737h134.521263v134.521263h46.133895a488.771368 488.771368 0 0 0 69.146947-12.072421v-122.448842z m0 122.448842a488.555789 488.555789 0 0 1-69.146947 12.072421h69.146947v-12.072421zM716.961684 279.552C705.859368 122.179368 627.496421 0.538947 462.955789 0.538947h-1.185684c-164.648421 0-242.957474 121.694316-254.059789 279.013053-22.258526 8.461474-35.516632 43.654737-30.234948 83.321263 4.850526 37.025684 24.252632 66.021053 45.972211 71.78779 18.970947 61.278316 52.655158 113.448421 95.663158 149.719579 2.748632 6.413474 33.037474 94.369684-26.73179 133.01221-75.883789 49.044211-236.813474 60.631579-252.550736 167.828211-13.365895 90.704842-94.746947 130.964211 422.534736 133.12a5106.202947 5106.202947 0 0 0 221.776842-4.796632v-52.816842h-143.36V687.157895h64.458106c-21.018947-42.253474-1.832421-97.765053 0.431158-102.777263 42.954105-36.217263 76.692211-88.441263 95.609263-149.719579 21.719579-5.766737 41.175579-34.762105 45.97221-71.78779 5.227789-39.720421-8.084211-74.859789-30.181052-83.321263z"
          p-id="3077"
          fill="#ffffff"
        ></path>
      </svg>
    </div>
    <div
      class="join-us close"
      @click="handleJoinUsClose"
      :class="{ active: isOpen }"
      :style="visibilityClose"
    >
      <i class="el-icon-close"></i>
    </div>
    <div
      class="join-us-messageBox"
      :class="{ active: isOpen }"
      :style="visibilityClose"
    >
      <div class="join-us-title">Welcome To Join Us</div>
      <div class="join-us-content">
        <el-form
          ref="form"
          :model="postForm"
          label-position="right"
        >
          <el-form-item label="你的名字">
            <el-input v-model="postForm.name"></el-input>
          </el-form-item>
          <el-form-item label="你想做的方向">
            <el-input v-model="postForm.intention"></el-input>
          </el-form-item>
          <el-form-item label="你的QQ号">
            <el-input v-model="postForm.qqNum"></el-input>
          </el-form-item>
          <el-form-item label="你的年级">
            <el-input v-model="postForm.grade"></el-input>
          </el-form-item>
          <el-form-item label="你的专业">
            <el-input v-model="postForm.specialty"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="submit-wrapper">
        <el-button type="primary">提交</el-button>
      </div>
    </div>
    <home-header></home-header>
    <home-detail></home-detail>
    <div class="history-wrapper">
      <home-history></home-history>
      <divide-line></divide-line>
    </div>
    <div class="studio-wrapper">
      <studio-info></studio-info>
      <divide-line isTop></divide-line>
    </div>
    <div class="home-swiper-wrapper">
      <div class="teamInfo-wrapper">
        <h3>Our Team</h3>
        <p>
          CFC团队成立于2013年1月，是重庆理工大学第一支完全由学生自主创立的计
          算机实验室。团队最初由三位热爱Web技术，渴望交流的学长组建，经过多年
          的发展，团队不断壮大，成员们的学习方向也不再局限于Web。CFC已经成为重
          理工最大的的极客聚居地之一，并创造了多个校史第一。CFC一直秉承Crazy
          ForCode的理念，为校内热爱技术、乐于学习的学子提供一个舒适的Coding环
          境和优秀的交流平台。
        </p>
      </div>
      <home-swiper></home-swiper>
      <divide-line></divide-line>
    </div>
    <div class=""></div>
  </div>
</template>
<script>
import HomeSwiper from '@/views/swiper/Swiper'
import HomeHeader from '@/views/Head/HeadBar'
import HomeDetail from '@/views/Introduction'
import HomeHistory from '@/views/History/History'
import DivideLine from '@/components/DivideLine'
import StudioInfo from '@/views/StudioInfo/StudioInfo'
export default {
  name: "app",
  components: {
    HomeSwiper,
    HomeHeader,
    HomeDetail,
    HomeHistory,
    DivideLine,
    StudioInfo
  },
  data() {
    return {
      preScrollTop: 0,
      isOpen: false,
      postForm: {
        name: '',
        intention: '',
        qqNum: ''
      }
    }
  },
  computed: {
    visibilityClose() {
      const visibility = this.isOpen ? 'visible' : 'hidden'
      return {
        visibility
      }
    },
    visibilityOpen() {
      const visibility = this.isOpen ? 'hidden' : 'visible'
      return {
        visibility
      }
    }
  },
  methods: {
    handleJoinUsOpen() {
      this.isOpen = true
    },
    handleJoinUsClose() {
      this.isOpen = false
    },
    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      const diff = scrollTop - this.preScrollTop
      const headerBar = document.querySelector('.site-header')
      if (diff > 0) {
        headerBar.style.top = '-65px'
      } else {
        headerBar.style.top = '0'
      }
      this.preScrollTop = scrollTop
      const backTop = document.querySelector('.backTop')
      if (scrollTop > 200) {
        backTop.style.visibility = 'visible'
        backTop.style.opacity = 1
      } else {
        backTop.style.visibility = 'hidden'
        backTop.style.opacity = 0
      }
    },
    handleBackTop() {
      var gotoTop= function(){
        var scrollTop  = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > 5000) {
          scrollTop -= 1000
          window.scrollTo(0, scrollTop);
        } else if (scrollTop > 1000 && scrollTop <= 5000) {
          scrollTop -= 500
          window.scrollTo(0, scrollTop);
        } else if (scrollTop > 200 && scrollTop <= 1000) {
          scrollTop -= 100
          window.scrollTo(0, scrollTop);
        } else if (scrollTop > 50 && scrollTop <= 200) {
          scrollTop -= 10
          window.scrollTo(0, scrollTop);
        } else if (scrollTop > 0 && scrollTop <= 50) {
          scrollTop -= 5
          window.scrollTo(0, scrollTop);
        } else {
          clearInterval(timer);
          timer = null;
        }
      }
      var timer=setInterval(gotoTop, 18);
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    const loading = document.querySelector('.loading-wrapper')
    setTimeout(() => {
      loading.style.display = 'none'
    }, 1100)
    loading.style.opacity = 0
    document.querySelector('#app').className = 'active'
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Open+Sans&display=swap);
@import url(https://fonts.googleapis.com/css?family=Nunito:900&display=swap);
html, body, h1, h2, h3, h4, h5, h6, p, blockquote, button, dd, div, dl, dt, form, li, ol, p, pre, td, th, ul {
  margin: 0px;
  padding: 0px;
}
#app {
  min-width: 1250px;
  opacity: 0;
  transition: opacity 1s ease;
  .backTop {
    visibility: hidden;
    opacity: 0;
    position: fixed;
    background-color: #409eff;
    color: #fff;
    bottom: 90px;
    right: 40px;
    z-index: 20;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    cursor: pointer;
    transition: opacity 0.5s ease, visibility 0.5s ease;
  }
  .join-us.close {
    opacity: 0;
    transform: rotate(-30deg);
    font-size: 40px;
    transition: transform 0.16s linear 0s, opacity 0.08s linear 0s, visibility 0.16s linear;
    &.active {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
  .join-us.open {
    opacity: 0;
    transform: rotate(30deg) scale(0);
    transition: transform 0.16s linear 0s, opacity 0.08s linear 0s, visibility 0.16s linear;
    &.active {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
  }
  .join-us {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    position: fixed;
    width: 50px;
    height: 50px;
    z-index: 20;
    bottom: 30px;
    right: 40px;
    border-radius: 25%;
    background-color: #409eff;
    cursor: pointer;
  }
  .join-us-messageBox {
    // align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    // justify-content: center;
    opacity: 0;
    overflow: auto;
    display: flex;
    transform: translateY(50px);
    position: fixed;
    width: 300px;
    height: 525px;
    border-radius: 16px;
    bottom: 90px;
    right: 35px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1),
      2px 0 12px 0 rgba(0,0,0,.1),-2px 0 12px 0 rgba(0,0,0,.1),
      0 -2px 12px 0 rgba(0,0,0,.1);
    z-index: 999999;
    transition: transform 0.3s linear 0s, opacity 0.16s linear 0s, visibility 0.3s linear;
    &.active {
      opacity: 1;
      transform: translateY(0);
    }
    .join-us-title {
      text-align: center;
      padding-top: 5px;
      line-height: 40px;
      height: 40px;
      color: #fff;
      width: 100%;
      background-color: #409eff;
      font: {
        size: 24px;
        family: 'Nunito', sans-serif;
        weight: 900;
        style: normal;
      }
    }
    .join-us-content {
      padding: 0 16px;
      .el-form.el-form--label-right .el-form-item {
        margin-bottom: 0;
      }
    }
    .submit-wrapper {
      margin-top: 10px;
      padding: 10px 16px 10px;
      box-shadow: rgba(0, 0, 0, 0.08) 0px -0.0714286rem 0.857143rem;
      border-top: 0.0785714rem solid rgb(233, 235, 237);
      .el-button {
        width: 100%;
        font: {
          size: 16px;
          family: 'Nunito', sans-serif;
          style: normal;
        }
      }
    }
  }
  hr {
    margin: 0 auto;
    border-bottom-color: #eee;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #dfe2e5;
  }
  &.active {
    opacity: 1;
  }
  .history-wrapper {
    background-color: #f0f0f0;
    position: relative;
  }
  .home-swiper-wrapper {
    position: relative;
    padding-top: 80px;
    padding-bottom: 20px;
    background-color: #f0f0f0;
    .teamInfo-wrapper {
      width: 40%;
      margin: 0 auto 100px;
      text-align: center;
      position: relative;
      h3 {
        font: {
          size: 40px;
          family: "Open Sans script=all rev=1", "Adobe Blank";
          weight: blod;
        }
      }
      p {
        margin-top: 60px;
        margin-bottom: 40px;
        font: {
          size: 24px;
          family: "Open Sans script=all rev=1", "Adobe Blank";
          weight: 200;
        }
      }
    }
  }
  .studio-wrapper {
    position: relative;
  }
}
</style>
