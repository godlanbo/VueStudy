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
            <div v-for="(item, index) in itemInfo.detailInfo" :key="index" class="content-detail">
              <div class="detail-title">{{item.title}}</div>
              <div class="detail-content">
                <img v-if="isHaveImg" :src="item.imgUrl">
                {{item.content}}
              </div>
            </div>
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
        padding: 15px 0;
        overflow: hidden;
        width: 48%;
        flex: 0 1 auto;
        margin: 0 1%;
        flex-basis: 48%;
        // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        // border-radius: 15px;
      }
      .item-content {
        padding: 0 15px;
        position: relative;
        left: 17px;
        height: 532px;
        overflow-y: scroll;
        width: 100%;
        .content-detail {
          
          margin: 10px 0;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 15px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(46, 70, 145, 0.5) 0px 2px 0px 0px inset;
          border-radius: 20px;
          padding: 10px;
          font: {
            size: 20px;
            family: "Google Sans",Arial,Helvetica,sans-serif;
            weight: 400;
          }
          .detail-title {
            vertical-align: middle;
            font-weight: 900;
            font-size: 34px;
            line-height: 34px;
            width: 29%;
            display: inline-block;
          }
          .detail-content {
            vertical-align: middle;
            text-align: left;
            width: 70%;
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