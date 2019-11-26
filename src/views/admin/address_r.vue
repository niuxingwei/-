<!--
 * @Author: 测试专用
 * @Date: 2019-11-17 10:23:49
 * @LastEditTime: 2019-11-25 20:59:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12306\src\views\admin\address.vue
 -->

<template>
  <div>
    <div class="nav">
      <top-nav :showContent="showContent"></top-nav>
    </div>
    <br>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getMap(address)">搜索</el-button>
      </el-form-item>
    </el-form>

    <div>{{LocationCity}}</div> <!-- 渲染层 -->
    <div id="allmap"></div>
  </div>
</template>

<script>
import TopNav from '@/components/common/topNav/index'
import BMap from 'BMap'
export default {
  components: {
    TopNav
  },
  data () {
    return {
      type: 'tab',
      address_detail: null,
      center: {
        // lng:116.343048,
        lng:39.952061,
        lat: 116.343048
      },
      // 顶部导航
      showContent: {
        showBack: true,
        titleContent: '选择城市'
      },

      LocationCity: '加载中...',    //给渲染层定义一个初始值
      address: ''
    }

  },
  mounted () {
    // this.city()    //触发获取城市方法
    this.dz()
    this.ready()
  },
  methods: {
    /**
     * @description: 获取当前城市
     * @param {type} 
     * @return: 
     */
    // city () {    //定义获取城市方法
    //   const geolocation = new BMap.Geolocation();
    //   var _this = this
    //   geolocation.getCurrentPosition(function getinfo (position) {
    //     let city = position.address.city;             //获取城市信息
    //     let province = position.address.province;    //获取省份信息
    //     _this.LocationCity = city
    //   }, function (e) {
    //     _this.LocationCity = "定位失败"
    //   }, { provider: 'baidu' });
    // },
    dz () {
      var that = this
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function getinfo (position) {
        let city = position.address.city; //获取城市信息       
        let province = position.address.province;
        // console.log(city+'--'+province)
        that.LocationCity = city		//将城市名称保存到locationCity中
        console.log("定位城市")
        console.log(that.LocationCity)
        // that.$store.commit('hqwz', city)
      }, function (e) {
        that.LocationCity = '定位失败'
      }, {
        provider: 'baidu',
      });
    },
    /**
     * @description: 获取地图
     * @param {type} 
     * @return: 
     */
    ready () {
      let map = new BMap.Map('allmap')
      let point = new BMap.Point(this.center.lng, this.center.lat)
      map.centerAndZoom(point, 10)
      map.enableScrollWheelZoom(true)
      map.enableDoubleClickZoom(true)
      var geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((r) => {
        if (r.point) {
          this.center.lng = r.longitude
          this.center.lat = r.latitude
          let markers = new BMap.Marker(r.point)
          map.addOverlay(markers)
          map.panTo(r.point)
          map.centerAndZoom(r.point, 16)
        }
      }, {
        enableHighAccuracy: true
      })
    },
    /**
     * @description: 输入位置显示在地图上
     * @param {type} 
     * @return: 地图上显示坐标
     */
      getMap (address) {
      address = this.address
      console.log(address)
      // debugger
      let that = this;
      var map = new BMap.Map("allmap");
      var localSearch = new BMap.LocalSearch(map);
      map.clearOverlays();//清空原来的标注
      var keyword = this.managementAddress;
      localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        console.log(poi.point.lng);
        console.log(poi.point.lat);

        map.centerAndZoom(poi.point, 13);
        var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注
        map.addOverlay(marker);
        that.lng = poi.point.lng;
        that.lat = poi.point.lat;
      });
      localSearch.search(keyword);

    }
  }
}
</script>

<style  scoped>
.nav {
  background-color: #1fcca9;
}
#allmap {
  width: 80%;
  height: 500px;
  margin-top: 5%;
  margin-left: 10%;
}
</style>
