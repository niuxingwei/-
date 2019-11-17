<!--
 * @Author: 牛兴炜
 * @Date: 2019-10-28 22:12:02
 * @LastEditTime: 2019-11-17 14:34:32
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
          </span>
          <span class="svg-wrapper">
            <svg-icon icon-class='qiehuan'></svg-icon>
          </span>

          <span class="place-end">
            <span>终点站</span>
            <!-- <router-link :to="{path:'/address',query:{flag:'end'}}">{{endCity}}</router-link> -->
          </span>
          <div class="train-search-style">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
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
  data () {
    return {
      //顶部导航
      showContent: {
        showBack: false,
        titleContent: '车票预定'
      },
    }
  },
}
</script>
<style  lang="less"  scoped>
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
</style>