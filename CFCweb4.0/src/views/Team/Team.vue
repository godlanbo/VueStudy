<template>
  <div id="team">
    <div class="map-wrapper">
      <span>当前选中了: {{ cityName || '-' }}</span>
      <ve-map
        :data="chartData"
        :settings="chartSettings"
        :events="chartEvents"
        height="700px"
      ></ve-map>
    </div>
    <div class="showInfo-table-wrapper">
      <el-table></el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Team',
  data () {
    this.chartSettings = {
      position: 'china',
      aspectScale: 0.7,
      zoom: 1,
      roam: true,
      scaleLimit: {
        min: 1
      },
      // label: {
      //   // 绝对的像素值
      //   // position: [10, 10],
      //   // 相对的百分比
      //   normal: {
      //     show: true,
      //     position: 'inside',
      //     rotate: 90
      //   }
      // },
      itemStyle: {
        normal: {
          areaColor: '#eee',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: 'red' // 0% 处的颜色
            }, {
                offset: 1, color: 'blue' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        emphasis: {
          areaColor: '#33d6ff'
        }
      },
      selectedMode: 'single'
    }
    this.chartEvents = {
      click: (value) => {
        this.cityName = this.cityName == '' ? value.name : ''
      }
    }
    return {
      cityName: '',
      chartData: {
        columns: ['位置', '工作人数'],
        rows: [
          { '位置': '吉林', '工作人数': 123 },
          { '位置': '北京', '工作人数': 1223 },
          { '位置': '上海', '工作人数': 2123 },
          { '位置': '浙江', '工作人数': 4123 }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#team {
  .map-wrapper {
    padding-top: 150px;
    position: relative;
    width: 90%;
    margin: 0 auto;
  }
  .showInfo-table-wrapper {
    padding-top: 50px;
    position: relative;
    width: 90%;
    margin: 0 auto;
  }
}
</style>