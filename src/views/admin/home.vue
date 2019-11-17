<!--
 * @Author: 牛兴炜
 * @Date: 2019-10-28 22:12:02
 * @LastEditTime: 2019-11-17 16:33:20
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
      <br />
      <!--查询购票-->
      <div class="home-train-search">
        <div class="train-search-place clearfix">
          <span class="place-start">
            <span>始发站</span>
            <router-link
              class="link"
              :to="{ path: '/address', query: { flag: 'start' } }"
              >{{ startCity }}</router-link
            >
          </span>
          <el-tooltip content="点击互换站点" placement="bottom" effect="light">
            <span class="svg-wrapper" @click="qiehuan">
              <svg-icon icon-class="qiehuan"></svg-icon>
            </span>
          </el-tooltip>

          <span class="place-end">
            <span>终点站</span>
            <router-link
              class="link"
              :to="{ path: '/address', query: { flag: 'end' } }"
              >{{ endCity }}</router-link
            >
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
      </div>
    </div>
    <!--时间蒙版层-->
    <div class="timerMask" v-show="timeMask">
      <time-picker v-on:time-mask="hideMask"></time-picker>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/common/topNav/index'
import TimePicker from '@/components/common/timer/time'
export default {
  name: 'home',
  components: {
    TopNav,
    TimePicker
  },
  data() {
    return {
      //顶部导航
      showContent: {
        showBack: false,
        titleContent: '车票查询'
      },
      startCity: '', //始发站
      // 点击查询按钮是出发事件响应，向后台传递数据 用以检测车票余额
      endCity: '', //终点站
      timeMask: false //时间选择遮罩层
    }
  },
  created() {
    this.startCity = '北京西'
    this.endCity = '十堰'
  },
  computed: {
    checkDate() {
      console.log('测试时间')
      console.log(this.$store.state.checkedTime)
      return this.$store.state.checkedTime
    }
  },
  methods: {
    /*选择时间*/
    checkDateEvent() {
      this.timeMask = true
    },
    /*隐藏蒙版*/
    hideMask() {
      this.timeMask = false
    },
    /**
     * @description: 终点站和始发站之间的相互切换
     * @param {type}
     * @return: 名称切换
     */

    qiehuan() {
      let temCity = this.startCity
      this.startCity = this.endCity
      this.endCity = temCity
    }
  }
}
</script>
<style lang="less" scoped>
.homeContent {
  background-color: #edf1fa;
}
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
  font-size: 16px;
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
</style>
