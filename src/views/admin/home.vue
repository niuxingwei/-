<!--
 * @Author: 牛兴炜
 * @Date: 2019-10-28 22:12:02
 * @LastEditTime: 2019-11-28 09:27:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \simple-login-master\src\views\admin\home.vue
 -->
<template>
  <div class="homeContent">
    <!--
    <label class="font">余票查询系统</label> -->
    <!-- 主页 -->
    <div class="home">
      <top-nav :showContent="showContent"></top-nav>
      <ul class="slider">
        <li>
          <span></span>
        </li>
      </ul>
      <br>
      <!--查询购票-->
      <div class="home-train-search">
        <div class="train-search-place clearfix">
          <span class="place-start">
            <span>始发站</span>
            <router-link class="link" :to="{ path: '/address', query: { flag: 'start' } }">
              <span class="font"> {{ startCity }}</span>
            </router-link>
          </span>
          <el-tooltip content="点击互换站点" placement="bottom" effect="light">
            <span class="svg-wrapper_" @click="qiehuan">
              <svg-icon icon-class="qiehuan"></svg-icon>
            </span>
          </el-tooltip>

          <span class="place-end">
            <span>终点站</span>
            <span @click="EventendCity">
              <br>
              <span class="font"> {{ endCity }}</span>
            </span>
            <!-- <router-link :to="{path:'/address',query:{flag:'end'}}">{{endCity}}</router-link> -->
          </span>
          <div class="train-search-style">
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="train-search-date">
          <el-tooltip content="点击选择日期" placement="bottom" effect="light">
            <span class="date-msg" @click="checkDateEvent">
              {{ checkDate }}
            </span>
          </el-tooltip>
          <div style="text-align:right">
            <span class="el-icon-date"></span>
          </div>
        </div>
        <!-- <el-radio-group v-model="radio" :inline="true"> -->
        <div style="text-align:left">
          <el-radio v-model="radio" label="1" @change="radioChange">高铁</el-radio>
        </div>
        <div style="text-align:right">
          <el-radio v-model="radio" label="2" style="text-align:right" @change="radioChange">学生票</el-radio>
        </div>
        <br>
        <el-button type="primary" icon="el-icon-search" @click="search" class="searchBtn">查询</el-button>
        <br>
        <div class="train-search-tips">
          <span class="el-icon-alarm-clock"></span>
          <span class="tips-content">
            <span>{{history1}}</span>
            <span>{{history2}}</span>
          </span>
          <span class="tips-clear">
            <el-link type="danger" @click="clearTips">清空全部</el-link>
          </span>
        </div>

        <div class="home-section">
          <div class="section" @click="service">
            <span class="svg-wrapper">
              <svg-icon icon-class="train"></svg-icon>
            </span>
            <p>正晚点</p>
          </div>
          <div class="section" @click="service">
            <span class="svg-wrapper">
              <svg-icon icon-class="eating"></svg-icon>
            </span>
            <p>订餐服务</p>
          </div>
          <div class="section" @click="service">
            <span class="svg-wrapper">
              <svg-icon icon-class="taxi"></svg-icon>
            </span>
            <p>约车服务</p>
          </div>
        </div>

        <div class="home-notice">
          <span class="svg-wrapper">
            <svg-icon icon-class="police"></svg-icon>
          </span>
          <span class="notice-content">
            温馨提示：铁路12306每日06：00-23：00提供服务，在铁路12306购票，改签和退票须不晚于开车前30分钟
          </span>
          <span class="icon-notice-clear"></span>

        </div>

      </div>
      <div class="nav">
        <div class="nav-item" v-for="(item,index) in navList" v-bind:class="{'active-color':curIndex ===index}" @click="curIndex = index">
          <span class="svg-wrapper" @click="service">
            <svg-icon :icon-class="item.iconName"></svg-icon>
          </span>
          <p>{{item.iconContent}}</p>
        </div>
      </div>
    </div>
    <!--时间蒙版层-->
    <div class="timerMask" v-show="timeMask">
      <time-picker v-on:time-mask="hideMask"></time-picker>
    </div>
    <el-dialog title="终点站" :visible.sync="dialogTableVisible" @close="sentValue">
      <el-form :inline="true" v-model="station" class="addressInput">
        <el-form-item label="终点站">
          <el-input placeholder="请输入终点站" v-model="station.inputAddress"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="goSearch1()">确认</el-button>
        </el-form-item>
      </el-form>
      <!-- <div id="allmap"></div>
      <div class="home-notice">
        <span class="svg-wrapper">
          <svg-icon icon-class="police"></svg-icon>
        </span>
        <span>
          温馨提示：铁路12306每日06：00-23：00提供服务，在铁路12306购票，改签和退票须不晚于开车前30分钟
        </span>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import TopNav from '@/components/common/topNav/index'
import TimePicker from '@/components/common/timer/time'
import BMap from 'BMap'
import { homeSearchBySelect } from '@/api/homeSearch'
export default {
  name: 'home',
  components: {
    TopNav,
    TimePicker
  },
  data () {
    return {
      station: {
        inputAddress: ''
      },
      //顶部导航
      showContent: {
        showBack: false,
        titleContent: '车票查询系统'
      },
      startCity: '', //始发站
      // 点击查询按钮是出发事件响应，向后台传递数据 用以检测车票余额
      endCity: '十堰', //终点站
      timeMask: false, //时间选择遮罩层
      radio: '0',
      time: '',//查询时间
      history1: "北京西-深圳",
      history2: "北京-天津南",
      //底部nav当前选中项
      curIndex: 0,
      fullscreenLoading: false,//是否触发加载事件
      //底部nav数据
      navList: [
        {
          iconName: 'ticket',
          iconContent: '车票预订'
        },
        {
          iconName: 'travel',
          iconContent: '商旅服务'
        },
        {
          iconName: 'order',
          iconContent: '订单中心'
        },
        {
          iconName: '12306',
          iconContent: '我的12306'
        },
      ],
      dialogTableVisible: false, // 是否显示弹出框
      address_detail: null, //详细地址
      userlocation: { lng: "", lat: "" }
    }
  },
  // mounted () {
  //   setTimeout(() => {
  //     this.showMap(row)
  //   }, 500);
  //   /**
  //      * @description: 输入地址名称在地图上显示
  //      * @param {type} 
  //      * @return: 地图的显示
  //      */
  //   this.$nextTick(function () {

  //     var th = this
  //     // 创建Map实例
  //     var map = new BMap.Map("allmap");
  //     // 初始化地图,设置中心点坐标，
  //     var point = new BMap.Point(116.343048, 39.952061); // 创建点坐标，北京交通大学经纬度坐标
  //     map.centerAndZoom(point, 15);
  //     map.enableScrollWheelZoom();
  //     var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
  //       {
  //         "input": "suggestId"
  //         , "location": map
  //       })
  //     var myValue

  //     ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
  //       var _value = e.item.value;
  //       myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
  //       this.address_detail = myValue
  //       setPlace();
  //     });



  //     function setPlace () {
  //       map.clearOverlays();    //清除地图上所有覆盖物
  //       function myFun () {
  //         th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
  //         map.centerAndZoom(th.userlocation, 18);
  //         map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
  //       }

  //       var local = new BMap.LocalSearch(map, { //智能搜索
  //         onSearchComplete: myFun
  //       });
  //       local.search(myValue);

  //       //测试输出坐标（指的是输入框最后确定地点的经纬度）
  //       map.addEventListener("click", function (e) {
  //         //经度
  //         console.log(th.userlocation.lng);
  //         //维度
  //         console.log(th.userlocation.lat);

  //       })
  //     }

  //   })
  // },
  created () {
    let self = this;
    /* 选择的城市 */
    let cityname = this.$route.query.Select;
    if (cityname && this.$route.query.flag === 'start') {
      this.startCity = cityname
    } else {
      this.startCity = "北京西";
    }
    // if (cityname && this.$route.query.flag === 'end') {
    //   this.endCity = cityname;
    // } else {
    //   this.endCity = "十堰";
    // }
    console.log("始发站---->" + this.startCity)
  },
  computed: {
    checkDate () {
      console.log('测试时间')
      console.log(this.$store.state.checkedTime)
      this.time = this.$store.state.checkDate
      return this.$store.state.checkedTime
    }
  },
  methods: {
    /**
 * @description: 查询按钮出发事件
 * @param {type} 
 * @return: 
 */
    goSearch () {
      console.log("选择的城市" + "---->" + this.address_detail)
      setTimeout(() => {
        loading.close();
      }, 2000);
      let flag = this.$route.query.flag;
      this.$router.push({ path: '/home', query: { Select: this.address_detail, flag: flag } })

    },
    /*选择时间*/
    checkDateEvent () {
      this.timeMask = true
    },
    /*隐藏蒙版*/
    hideMask () {
      this.timeMask = false
    },
    /**
     * @description: 
     * @param {type} 
     * @return: 
     */
    goSearch1 () {
      this.$notify({
        title: '温馨提示',
        message: '查询成功！点击右上角关闭即可',
        type: 'success'
      });
    },
    /**
     * @description: 终点站和始发站之间的相互切换
     * @param {type}
     * @return: 名称切换
     */

    qiehuan () {
      let temCity = this.startCity
      this.startCity = this.endCity
      this.endCity = temCity
      this.$notify({
        title: '温馨提示',
        message: '切换成功！',
        type: 'success'
      });
    },
    /**
     * @description: 查询按钮
     * @param {type} 
     * @return: 展示数据
     */
    search () {
      console.log("查询数据")
      this.$router.push('searchType')
      homeSearchBySelect(this.startCity, this.endCity, this.radio, this.$store.state.checkedTime).then((response) => {
        console.log("后台传递数据")
        console.log(response.data)
      })

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
      // 以下是“清除内容”的历史记录切换
      this.history1 = this.startCity + "-" + this.endCity;
      let temCity = this.history2
      this.history2 = this.history1
      this.history1 = temCity

    },
    /**
     * @description: 监听单选框事件变化
     * @param {type} 
     * @return: 打印变化值
     */
    radioChange (val) {
      console.log('单选框的值为:')
      console.log(val)
    },
    /**
     * @description: 清空数据
     * @param {type} 
     * @return: 搜索历史清空
     */
    clearTips () {
      this.history1 = ""
      this.history2 = ""
      this.$notify({
        title: '温馨提示',
        message: '已清空!',
        type: 'success'
      });
    },
    /**
     * @description: 晚点、约车、饮食服务未开启
     * @param {type} 
     * @return: 
     */
    service () {
      {
        this.$notify.error({
          title: '温馨提示',
          message: '抱歉，该服务未开启哦'
        });
      }
    },
    /**
     * @description: 显示终点车站
     * @param {type} 
     * @return: 
     */
    EventendCity () {
      this.dialogTableVisible = true
      console.log("终点站" + this.station.inputAddress)
      this.sentValue()
    },
    /**
     * @description: 关闭dialog时传值
     * @param {type} 
     * @return: 
     */
    sentValue () {
      console.log("终点站" + this.station.inputAddress)

      this.endCity = this.station.inputAddress
    }
  }
}
</script>
<style lang="less" scoped>
.homeContent {
  background-color: #edf1fa;
}
// #allmap {
//   width: 80%;
//   height: 500px;
//   margin-top: 2%;
//   margin-left: 10%;
//   font-family: '微软雅黑';
//   border: 1px solid green;
//   /* #allmap {
//   width: 80%;
//   height: 500px;
//   margin-top: 5%;
//   margin-left: 10%;
// } */
// }
.home-train-search {
  text-align: center;
  float: left;
  width: 92%;
  background-color: #fff;
  border-radius: 6px;
  margin-left: 4%;
  padding: 20px 20px 10px 15px;
  box-sizing: border-box;
  position: relative;
  margin-top: -18px;
  .train-search-place {
    padding-bottom: 20px;
    border-bottom: 1px dashed #e9f3f1;
    position: relative;
    .place-start {
      display: inline-block;
      text-align: center;
      width: 40%;
      span {
        font-size: 12px;
        color: #999999;
      }
      a {
        display: block;
        font-size: 16px;
        color: #0a0a0a;
      }
    }
    // .place-to {
    //   /*e917*/
    //   float: left;
    //   width: 20%;
    //   margin-top: 14px;
    //   text-align: center;
    // }
    .place-end {
      width: 40%;
      display: inline-block;
      text-align: center;
      span {
        font-size: 12px;
        color: #999999;
      }
      a {
        display: block;
        font-size: 16px;
        color: #0a0a0a;
      }
    }
    .train-search-style {
      span {
        position: absolute;
        z-index: 999;
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #edf1fa;
        bottom: -6px;
        &:first-child {
          left: -21px;
        }
        &:last-child {
          right: -25px;
        }
      }
    }
  }
  .train-search-date {
    text-align: left;
    padding: 10px 0;
    border-bottom: 1px solid #f6f8fd;
    // .date-msg {
    //   vertical-align: middle;
    //   color: #0a0a0a;
    //   margin-left: 2px;
    // }
    /*e911*/

    // .icon-date::after {
    //   content: '\e911';
    //   font-size: 20px;
    //   color: #52e6c8;
    // }
  }
}
/*轮播图*/
.slider {
  li {
    width: 100%;
    span {
      display: inline-block;
      width: 100%;
      height: 114px;
      background-color: #1ec7a9;
    }
  }
}
.svg-wrapper {
  font-size: 19px;
  text-align: center;
  color: #1ec7a9;
}
.svg-wrapper_ {
  width: 20%;
  margin-top: 14px;
  font-size: 19px;
  text-align: center;
  color: #1ec7a9;
}

.link {
  text-decoration: none;
}
.timerMask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /*height: 100%;*/
  z-index: 999;
  background-color: rgb(255, 250, 245);
}
.el-icon-date {
  text-align: right;
  color: #1ec7a9;
}
.searchBtn {
  background-color: #21d9b4;
  width: 100%;
}
.train-search-tips {
  text-align: left;
  margin-top: 16px;
  font-size: 12px;
  color: #bdbdbd;
}
/*清除全部*/
.tips-clear {
  text-align: right;
  a {
    color: #bdbdbd;
  }
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
}
.el-icon-alarm-clock {
  color: #21d9b4;
}
/*其他服务*/
.home-section {
  width: 100%;
  height: 350px;
  background-color: wheat;
  margin-top: 20px;
  margin-bottom: 16px;
  height: 100px;
  display: flex;
  padding: 20px 0;
  box-sizing: border-box;
  .section {
    flex: 1;
    text-align: center;
    position: relative;
    svg-icon {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(31, 204, 169, 0.1);
      border-radius: 50%;
      font-size: 20px;
      color: #1fcca9;
    }
    p {
      font-size: 12px;
      margin-top: 10px;
      color: #b6b6b6;
    }
    i {
      position: absolute;
      top: 0;
      left: 55%;
    }
  }
  /*温馨提示*/
  .home-notice {
    width: 100%;
    background-color: red;
    padding-top: 10px;
    padding-bottom: 10px;
    .icon-notice {
      float: left;
      width: 40px;
      height: 40px;
      background-color: red;
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      margin-left: 20px;
      margin-right: 20px;
    }
    // .icon-notice::after {
    //   content: "\e916";
    //   color: #1fcca9;
    //   font-size: 24px;
    // }
    // .notice-content {
    //   font-size: 12px;
    //   color: #bdbdbd;
    // }
  }
}
.home {
  width: 100%;
  /*height:100%;*/
  height: 350px;
  padding-bottom: 70px;
  position: relative;
}
.notice-content {
  font-size: 12px;
  color: #bdbdbd;
}
/*选中设置颜色*/
.active-color {
  color: #1fcca9 !important;
}
// 设置字体样式
.font {
  font-family: serif;
  font-size: 18px;
  font-weight: 200;
}
.addressInput {
  margin-left: 5%;
}
/*底部nav*/
.nav {
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  .nav-item {
    flex: 1;
    text-align: center;
    font-size: 10px;
    padding: 5px;
    color: #bdbdbd;
    span {
      font-size: 20px;
    }
  }
}
</style>
