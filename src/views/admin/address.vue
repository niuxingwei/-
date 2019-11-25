<!--
 * @Author: 测试专用
 * @Date: 2019-11-17 10:23:49
 * @LastEditTime: 2019-11-25 17:47:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12306\src\views\admin\address.vue
 -->

<template>
  <div>
    <div class="nav">
      <top-nav :showContent="showContent"></top-nav>
    </div>
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
        lng: 116.40387397,
        lat: 39.91488908
      },
      // 顶部导航
      showContent: {
        showBack: true,
        titleContent: '选择城市'
      },

      LocationCity: '加载中...'    //给渲染层定义一个初始值
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
