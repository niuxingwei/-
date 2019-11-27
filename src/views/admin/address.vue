<!--
 * @Author: your name
 * @Date: 2019-11-25 21:01:45
 * @LastEditTime: 2019-11-27 09:52:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12306\src\views\admin\address_t.vue
 -->
<template>
  <div id="all">
    <div class="nav">
      <top-nav :showContent="showContent"></top-nav>
    </div>
    <br>
    <el-form :inline="true" class="addressInput">
      <el-form-item label="始发站">
        <el-input id="suggestId" name="address_detail" placeholder="请输入地址" v-model="address_detail"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="goSearch()">查询</el-button>
      </el-form-item>
    </el-form>
    <div id="allmap"></div>
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
//import {MP} from '../../map'
import TopNav from '@/components/common/topNav/index'
import BMap from 'BMap'
export default {
  data () {
    return {
      // 顶部导航
      showContent: {
        showBack: true,
        titleContent: '选择城市'
      },
      address_detail: null, //详细地址
      userlocation: { lng: "", lat: "" }

    }
  },
  components: {
    TopNav
  },
  mounted () {
    /**
       * @description: 输入地址名称在地图上显示
       * @param {type} 
       * @return: 地图的显示
       */
    this.$nextTick(function () {

      var th = this
      // 创建Map实例
      var map = new BMap.Map("allmap");
      // 初始化地图,设置中心点坐标，
      var point = new BMap.Point(116.343048, 39.952061); // 创建点坐标，北京交通大学经纬度坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();
      var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
          "input": "suggestId"
          , "location": map
        })
      var myValue

      ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        var _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        this.address_detail = myValue
        setPlace();
      });



      function setPlace () {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun () {
          th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          map.centerAndZoom(th.userlocation, 18);
          map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
        }

        var local = new BMap.LocalSearch(map, { //智能搜索
          onSearchComplete: myFun
        });
        local.search(myValue);

        //测试输出坐标（指的是输入框最后确定地点的经纬度）
        map.addEventListener("click", function (e) {
          //经度
          console.log(th.userlocation.lng);
          //维度
          console.log(th.userlocation.lat);

        })
      }

    })
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

    }
  }
}
</script>
<style scoped>
#allmap {
  width: 80%;
  height: 500px;
  margin-top: 2%;
  margin-left: 10%;
  font-family: '微软雅黑';
  border: 1px solid green;
  /* #allmap {
  width: 80%;
  height: 500px;
  margin-top: 5%;
  margin-left: 10%;
} */
}
.nav {
  background-color: #1fcca9;
}
.addressInput {
  margin-left: 5%;
}
/*温馨提示*/
.home-notice {
  width: 100%;
  margin-top: 2%;
  text-align: center;
  font-size: 18px;
  font-family: monospace;
}
</style>

