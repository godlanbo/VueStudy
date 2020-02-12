<template>
  <div class="member">
    <div class="img" :style="imgStyle"></div>
    <div class="info">
      <h3>{{memberInfo.name}}</h3>
      <h3 style="color: #57d0f9">{{memberInfo.designation}}</h3>
      <p>{{memberInfo.detail}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "member",
  props: {
    memberInfo: {
      type: Object,
      default() {
        return {
          imgUrl: '',
          name: '期待你的加入',
          designation: '期待你的加入',
          detail: '期待你的加入'
        }
      }
    }
  },
  data() {
    return {
      imgStyle: {
        // "background-image": `url(${this.memberInfo.imgUrl})`
        "background-image": `url(${this.memberInfo.imgUrl})`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.member {
  position: relative;
  display: inline-block;
  width: 33.33%;
  white-space: normal;
  vertical-align: top;
  text-align: center;
  .img {
    position: relative;
    display: inline-block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    margin: 0 auto;
    border: 4px solid white;
    border-radius: 50%;
    box-shadow: inset 0 0 0 5px rgba(0,0,0,.05);
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    background-color: #f1f1f1;
    height: 150px;
    width: 150px;
  }
}
.info {
  padding: 2% 5%;
  h3 {
    margin-block-start: 0;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    line-height: 30px;
    font-weight: 300;
  }
}
</style>