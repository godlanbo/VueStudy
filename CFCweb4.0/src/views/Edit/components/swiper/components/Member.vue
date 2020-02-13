<template>
  <div :class="['member', { isTool: !isEdit }]">
    <div class="img" :style="imgStyle" @click="handleToolClick"></div>
    <div class="info">
      <h3>{{memberInfo.name}}</h3>
      <h3 style="color: #57d0f9">{{memberInfo.designation}}</h3>
      <p>{{memberInfo.detail}}</p>
    </div>
    <div v-if="isEdit" class="edit-tools">
      <el-button
        type="primary"
        size="small"
        round
        icon="el-icon-edit"
        @click="handleEditClick"
      >编 辑</el-button>
      <el-button
        type="danger"
        size="small"
        round
        icon="el-icon-delete"
        @click="handleDeleteClick"
      >删 除</el-button>
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
  computed: {
    imgStyle() {
      return {
        // "background-image": `url(${this.memberInfo.imgUrl})`
        "background-image": `url(${this.memberInfo.imgUrl})`
      }
    },
    isEdit() {
      return this.memberInfo.imgUrl.split('/').pop() !== 'add.png'
    }
  },
  methods: {
    handleToolClick() {
      if (this.isEdit) {
        return
      }
      this.$emit('add-member')
    },
    handleEditClick() {
      this.$emit('edit-member', this.memberInfo.name)
    },
    handleDeleteClick() {
      this.$emit('delete-member', this.memberInfo.name)
    }
  }
}
</script>
<style lang="scss" scoped>
.isTool {
  .img {
    cursor: pointer;
  }
}
.member {
  height: 510px;
  position: relative;
  display: inline-block;
  width: 33.33%;
  white-space: normal;
  vertical-align: top;
  text-align: center;
  transition: transform .6s ease, opacity .6s ease, visibility .6s ease;
  &.active {
    transform: translateY(-80px);
    opacity: 0;
    visibility: hidden;
  }
  .edit-tools {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, -50%);
  }
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