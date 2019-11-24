<!--
 * @Author: 牛兴炜
 * @Date: 2019-11-24 09:49:42
 * @LastEditTime: 2019-11-24 13:12:16
 * @LastEditors: Please set LastEditors
 * @Description: 主界面点击查询按钮，跳转到查询类别界面
 * @FilePath: \12306\src\views\admin\searchType.vue
 -->

<template  >
  <div class="searchResult">
    <div class="nav">
      <top-nav :showContent="showContent"></top-nav>
    </div>
    <br>

    <!--添加查询类别选择框 -->
    <el-form class="type" >
      <el-form-item label="请选择查询类别">

  <el-select v-model="selectType" clearable placeholder="请选择查询类别">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" icon="el-icon-search" @click="search">查询</el-button>
      </el-form-item>
    <br>
      <!-- 存放可视化 -->
      <div id="typeEchart"></div>
      <!-- 动态数据可视化 -->
      <div id="dpEchart"></div>
    </el-form>

    <br>
    <br>
    <div class="home-notice">
      <span class="svg-wrapper">
        <svg-icon icon-class="police"></svg-icon>
      </span>
      <span>
        温馨提示：铁路12306每日06：00-23：00提供服务，在铁路12306购票，改签和退票须不晚于开车前30分钟
      </span>
    </div>
  </div>
</template>
<script>
// 局部按需引入

// import echarts from 'echarts'
const echarts = require('echarts')
import TopNav from '@/components/common/topNav/index'
export default {
  data () {
    return {
      //顶部导航
      showContent: {
        showBack: false,
        titleContent: '选择查询类别'
      },
      // 选择框
      options: [],
      // 选择框的value
      selectType: '',
      dataListLoading: false,// 表单加载进度条
    }
  },
  components: {
    TopNav
  },
  created () {
    this.getDataList()
  },
  mounted () {
    this.typeEcharts()
    this.getDyEchart()
    document.querySelector('body').setAttribute('style', 'background-color:white')
  },
  methods: {
    /**
     * @description: 查询类别信息获取
     * @param {type} 
     * @return: 车站列表信息
     */
    getDataList () {
      this.dataListLoading = true
      this.options = [{
        value: 'searchTrain',
        label: '列车查询'
      }, {
        value: 'searchStation',
        label: '车站查询'
      }, {
        value: 'searchTicket',
        label: '车票查询'
      }, {
        value: 'searchPassenger',
        label: '乘客信息查询'
      }]
      // 获取数据，最后要将dataListLoading设置为false
      // alert("数据已获取！")
      this.dataListLoading = false
    },
    /**
     * @description: 表格数据着色，便于观察
     * @param {type} 
     * @return: 
     */
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'warning-row';
      } else if (rowIndex % 2 === 0) {
        return 'success-row';
      }
      return '';
    },
    /**
    * @description: 请求对应页的数据
    * @author：牛兴炜
    * @param {this.pageIndex（当前页数）}
    * @return: 对应页的数据
    */
    currentChangeHandle (val) {
    },
    /**
     * @description: 查询界面查询按钮
     * @param {type} 
     * @return: 
     */
    search () {
      console.log("当前选择结果")
      console.log(this.selectType)
    },
    /**
     * @description: 查询类别的可视化显示
     * @param {点击次数} 
     * @return: 可视化图表的变化
     */
    typeEcharts () {
      console.log("可视化开启")
      let typeChart = echarts.init(
        document.getElementById('typeEchart')
      );
      typeChart.setOption({
        backgroundColor: ' white',
        title: {
          text: '查询统计结果',
          left: 'center',
          top: '5',
          textStyle: {
            color: 'red'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '查询结果',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '列车查询' },
              { value: 310, name: '车站查询' },
              { value: 274, name: '车票查询' },
              { value: 235, name: '乘客信息查询' }
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(231, 76, 60)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]

      }
      )    },
    /**
     * @description: 动态数据可视化
     * @param {type} 
     * @return: 实时更换数据
     */
    getDyEchart () {
      const DPEchart = echarts.init(document.getElementById('dpEchart'))
      let option = {
        // backgroundColor: ' #D5F5E3',
        title: {
          text: '动态估计',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          data: ['最新查票次数', '预计查询次数']
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: (function () {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(now - 2000);
              }
              return res;
            })()
          },
          {
            type: 'category',
            boundaryGap: true,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: true,
            name: '',
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '预计查询次数',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function () {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })()
          },
          {
            name: '最新查票次数',
            type: 'line',
            data: (function () {
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                len++;
              }
              return res;
            })()
          }
        ]
      };
      app.count = 11;
      setInterval(function () {
        let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        data0.shift();
        data0.push(Math.round(Math.random() * 1000));
        data1.shift();
        data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

        option.xAxis[0].data.shift();
        option.xAxis[0].data.push(axisData);
        option.xAxis[1].data.shift();
        option.xAxis[1].data.push(app.count++);

        DPEchart.setOption(option);
      }, 2100);
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  background-color: #1fcca9;
}
.el-table .warning-row {
  background: green;
}

.el-table .success-row {
  background: green;
}
.type {
  margin-left: 10%;
}
#typeEchart {
  margin-top: 1.6%;
  width: 400px;
  height: 450px;
  float: left;
}
#dpEchart {
  margin-right: 5%;
  margin-top: 1.6%;
  width: 400px;
  height: 450px;
  float: right;
}
/*温馨提示*/
.home-notice {
  width: 100%;
  margin-top: 30%;
  text-align: center;
  font-size: 18px;
  font-family: monospace;
}
</style>