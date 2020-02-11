<template>
  <div :class="['member', { active: isDelete }]">
    <div class="img" :style="imgStyle"></div>
    <div class="info">
      <h3>{{memberInfo.name}}</h3>
      <h3>{{memberInfo.designation}}</h3>
      <p>{{memberInfo.detail}}</p>
    </div>
    <div class="edit-tools">
      <el-button
        type="primary"
        size="small"
        round
        icon="el-icon-edit"
        @click="handleEditClick"
      >编辑</el-button>
      <el-button
        type="danger"
        size="small"
        round
        icon="el-icon-delete"
        @click="handleDeleteClick"
      >删除</el-button>
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
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imgStyle: {
        // "background-image": `url(${this.memberInfo.imgUrl})`
        "background-image": `url(http://localhost:8090/img-1581239175760.jpeg)`
      }
    }
  },
  methods: {
    handleEditClick() {
      this.$emit('editMember', this.memberInfo.name)
    },
    handleDeleteClick() {
      this.$emit('deleteMember', this.memberInfo.name)
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
  transition: transform 1s ease, opacity 1s ease, visibility 1s ease;
  &.active {
    transform: translateY(-80px);
    opacity: 0;
    visibility: hidden;
  }
  .img {
    position: relative;
    display: inline-block;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 1;
    margin: 0 auto;
    border-radius: 50%;
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