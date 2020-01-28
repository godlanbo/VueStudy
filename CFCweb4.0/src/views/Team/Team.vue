<template>
  <div id="team">
    <div class="map-wrapper">
      <span style="margin-left: 20%;">当前选中了: {{ cityName || '-' }}</span>
      <ve-map
        :data="chartData"
        :settings="chartSettings"
        :events="chartEvents"
        height="700px"
      ></ve-map>
    </div>
    <div class="showInfo-table-wrapper">
      <el-table :data="tableData" style="width: 100%" height="283" stripe>
         <el-table-column
          align="center"
          prop="name"
          label="姓名"
          width="455px">
        </el-table-column>
        <el-table-column
          align="center"
          prop="workCompany"
          label="工作单位"
          width="455px">
        </el-table-column>
        <el-table-column
          align="center"
          prop="workCity"
          label="工作城市"
          width="455px">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { queryTeamInfo } from '@/api/index'
export default {
  name: 'Team',
  data () {
    this.chartSettings = {
      position: 'china',
      labelMap: {
        'place': '位置',
        'number': '工作人数'
      },
      aspectScale: 0.7,
      zoom: 1,
      roam: 'scale',
      scaleLimit: {
        min: 1
      },
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
        if (value.name !== this.cityName) {
          this.cityName = value.name
          this.queryMapData(value.name)
        }
      }
    }
    return {
      cityName: '',
      chartData: {
        columns: ['place', 'number'],
        rows: this.getMapData()
      },
      tableData: []
    }
  },
  methods: {
    getMapData() {
      return [
        { 'place': '吉林', 'number': 123 },
        { 'place': '北京', 'number': 1223 },
        { 'place': '上海', 'number': 2123 },
        { 'place': '浙江', 'number': 4123 }
      ]
    },
    queryMapData(queryString) {
      queryTeamInfo(queryString).then(response => {
        this.tableData = response.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#team {
  opacity: 1;
  .map-wrapper {
    padding-top: 100px;
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