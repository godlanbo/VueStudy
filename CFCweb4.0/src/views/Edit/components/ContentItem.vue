<template>
  <div class="timebase-item-wrapper">
    <div class="timebase-item">
      <div class="item-content-wrapper">
        <div class="item-title-wrapper">
          <div class="item-title">{{itemInfo.title}}</div>
        </div>
        <div class="item-content-wrapper">
          <div class="item-content">
            <el-timeline>
              <el-timeline-item
                class="content-detail"
                v-for="(item, index) in itemInfo.detailInfo"
                :key="index"
                :timestamp="item.title"
                type="primary"
                icon="el-icon-date"
                size="large"
                placement="top">
                <el-card>
                  <div class="detail-content">
                    <img v-if="isHaveImg(item)" :src="item.imgUrl">
                    {{item.content}}
                    <div class="detail-item-tool">
                      <el-button
                        size="mini"
                        v-waves
                        type="primary"
                        icon="el-icon-edit"
                        @click="handleClickEdit(index)"
                      >编 辑</el-button>
                      <el-button
                        size="mini"
                        v-waves
                        type="danger"
                        icon="el-icon-delete"
                        @click="handleClickDelete(index)"
                      >删 除</el-button>
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        <div class="item-bottom">
          <div class="tool-wrapper">
            <el-button
              round
              v-waves
              type="success"
              icon="el-icon-circle-plus-outline"
              @click="handleClickAdd"
            >新 增</el-button>
            <el-button
              round
              v-waves
              type="danger"
              icon="el-icon-delete"
              @click="handleClickDeleteAll"
            >删 除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import waves from '@/components/waves/waves'
export default {
  name: 'ContentItem',
  directives: {
    waves
  },
  props: {
    itemInfo: {
      type: Object,
      default: null
    },
    itemIndex: Number
  },
  methods: {
    handleClickAdd() {
      this.$emit('add-detail', this.itemIndex, -1)
    },
    handleClickDeleteAll() {
      this.$emit('delete-all', this.itemIndex)
    },
    handleClickEdit(index) {
      this.$emit('edit-detail', this.itemIndex, index)
    },
    handleClickDelete(index) {
      this.$emit('delete-detail', this.itemIndex, index)
    },
    isHaveImg(item) {
      return item.imgUrl !== undefined
    }
  }
}
</script>
<style lang="scss" scoped>
.timebase-item-wrapper {
  margin-top: 96px;
  width: 100%;
  text-align: center;
  .timebase-item {
    width: 90%;
    margin: 0 auto;
    .item-content-wrapper {
      display: flex;
      flex-wrap: wrap;
      .item-title-wrapper {
        position: relative;
        width: 48%;
        margin: 0 1%;
        flex: 0 1 auto;
        flex-basis: 48%;
        .item-title {
          text-align: left;
          position: sticky;
          top: 96px;
          font-size: 10vw;
          line-height: 10vw;
          font-family: "Google Sans Display",Arial,Helvetica,sans-serif;
        }
      }
      .item-content-wrapper {
        box-sizing: border-box;
        // padding: 15px 0;
        overflow: hidden;
        width: 48%;
        flex: 0 1 auto;
        margin: 0 1%;
        flex-basis: 48%;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1),
        2px 0 12px 0 rgba(0,0,0,.1),-2px 0 12px 0 rgba(0,0,0,.1),
        0 -2px 12px 0 rgba(0,0,0,.1);
        border-radius: 15px;
      }
      .item-content {
        padding-right: 25px;
        padding-left: 10px;
        position: relative;
        left: 17px;
        height: 532px;
        overflow-y: scroll;
        width: 100%;
        .el-timeline {
          padding-top: 20px;
          padding-inline-start: 0;
        }
        .content-detail {
          font: {
            size: 20px;
            family: "Google Sans",Arial,Helvetica,sans-serif;
            weight: 400;
          }
          .detail-content {
            text-align: left;
            width: 100%;
            display: inline-block;
            img {
              width: 100%;
            }
            .detail-item-tool {
              text-align: center;
              margin-top: 5%;
            }
          }
        }
      }
      .item-bottom {
        flex: 0 1 auto;
        border-bottom: 1px solid #dadce0;
        height: 96px;
        width: 98%;
        margin: 0 1%;
        .tool-wrapper {
          float: right;
          margin-top: 25px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.content-detail {
  .el-timeline-item__node {
    height: 24px;
    width: 24px;
    left: -7px;
    top: -4px;
    background-color: white;
    .el-timeline-item__icon {
      // color: #909399; // info
      color: #409EFF;
      font-size: 24px;
    }
  }
}
.el-timeline-item__timestamp {
  font-size: 18px;
  text-align: left;
}
</style>