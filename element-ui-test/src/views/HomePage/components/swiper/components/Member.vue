<template>
  <div class="member">
    <div class="img" :style="imgStyle"></div>
    <div class="info">
      <h3>{{memberInfo.name}}</h3>
      <h3>{{memberInfo.designation}}</h3>
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
        "background-image": `url(${this.memberInfo.imgUrl})`
      }
    }
  }
}
</script>
<style scoped>
.member .img {
  position: relative;
  display: inline-block;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 1;
  margin: 0 auto;
  border-radius: 15px;
  background-color: #f1f1f1;
  height: 325px;
  width: 150px;
}
.member {
  position: relative;
  display: inline-block;
  width: 33.33%;
  white-space: normal;
  vertical-align: top;
  text-align: center;
}
.info h3 {
  margin-bottom: 10px;
}
</style>