<template>
  <div id="JoinUs">
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
          fill="#8a8a8a"
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
  </div>
</template>
<script>
export default {
  name: 'JoinUs',
  data() {
    return {
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
    }
  }
}
</script>
<style lang="scss" scoped>
#JoinUs {
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
    position: fixed;
    width: 50px;
    height: 50px;
    z-index: 20;
    bottom: 30px;
    right: 40px;
    border-radius: 25%;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1),
      2px 0 12px 0 rgba(0,0,0,.1),-2px 0 12px 0 rgba(0,0,0,.1),
      0 -2px 12px 0 rgba(0,0,0,.1);
    background-color: #fff;
    
    cursor: pointer;
  }
  .join-us-messageBox {
    flex-direction: column;
    box-sizing: border-box;
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
}
</style>