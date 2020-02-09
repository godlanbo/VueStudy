<template>
  <div class="timebase-item-wrapper">
    <div class="timebase-item">
      <div class="item-content-wrapper">
        <div class="item-title-wrapper">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-title-fill"></div>
        </div>
        <div class="item-content-wrapper">
          <div class="item-content">
            <!-- <div v-for="(item, index) in itemInfo.detailInfo" :key="index" class="content-detail">
              <div class="detail-title">{{item.title}}</div>
              <div class="detail-content">
                <img v-if="isHaveImg" :src="item.imgUrl">
                {{item.content}}
              </div>
            </div> -->
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
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        <div class="item-bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentItem',
  props: {
    itemInfo: {
      type: Object,
      default: null
    }
  },
  methods: {
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
    width: 80%;
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
        .item-title-fill {
          height: 380px;
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
            // vertical-align: top;
            text-align: left;
            width: 100%;
            display: inline-block;
            img {
              width: 100%;
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