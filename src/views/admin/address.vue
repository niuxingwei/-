<!--
 * @Author: 测试专用
 * @Date: 2019-11-17 10:23:49
 * @LastEditTime: 2019-11-17 15:59:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \12306\src\views\admin\address.vue
 -->

<template>
  <div class="checkAddress">
    <div class="positionGroup" :class="curFocus == true ? 'searchActive' : ''">
      <top-nav :showContent="showContent" v-if="!curFocus"></top-nav>
      <!--搜索框-->
      <div class="search">
        <span class="icon-search"></span>
        <input
          type="text"
          placeholder="中文/拼音/首字母"
          @focus="translate"
          @blur="toTranslate"
          v-model="searchContent"
          @keydown.enter="searchCity"
        />
      </div>
    </div>
    <!--位置推荐-->
    <div class="quick-location" v-if="!curFocus">
      <!--定位推荐-->
      <div class="location">
        <div class="location-item">
          <span>根据您的定位推荐</span>
          <ul class="item-box clearfix">
            <li class="city-name">
              <a href="javascript:;">{{ curCity }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!--历史记录-->
      <div class="location">
        <div class="location-item">
          <span v-if="userAddress.historyCity">历史纪录</span>
          <ul class="item-box clearfix">
            <li
              class="city-name"
              v-for="(city, index) in userAddress.historyCity"
            >
              <a href="javascript:;">{{ city | sub }}</a>
            </li>
          </ul>
        </div>
      </div>
      <!--热门城市-->
      <div class="location">
        <div class="location-item">
          <span v-if="userAddress.hotCity">热门城市</span>
          <span v-if="userAddress.hotCity">热门城市</span>
          <ul class="item-box clearfix">
            <li class="city-name" v-for="(city, index) in userAddress.hotCity">
              <a href="javascript:;">{{ city | sub }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--字母定位-->
    <div class="spell-location" v-if="!curFocus">
      <div class="city" v-for="(citys, index) in allCity">
        <span class="city-litter" :id="citys.flage">{{ citys.flage }}</span>
        <ul class="city-list" v-for="(city, ind) in citys.names">
          <li>
            <a href="javascript:;" @click="checkCity(city.cityname)">{{
              city.cityname
            }}</a>
          </li>
        </ul>
      </div>

      <!--字母快速定位-->
      <div class="link-address">
        <ul class="link-item">
          <li><a href="javascript:;">推荐</a></li>
          <li><a href="javascript:;">历史</a></li>
          <li><a href="javascript:;">热门</a></li>
          <li><a href="#A">A</a></li>
          <li><a href="#B">B</a></li>
          <li><a href="#C">C</a></li>
          <li><a href="#D">D</a></li>
          <li><a href="#E">E</a></li>
          <li><a href="#F">F</a></li>
          <li><a href="#G">G</a></li>
          <li><a href="#H">H</a></li>
          <li><a href="#I">I</a></li>
          <li><a href="#J">J</a></li>
          <li><a href="#K">K</a></li>
          <li><a href="#L">L</a></li>
          <li><a href="#M">M</a></li>
          <li><a href="#N">N</a></li>
          <li><a href="#O">O</a></li>
          <li><a href="#P">P</a></li>
          <li><a href="#Q">Q</a></li>
          <li><a href="#R">R</a></li>
          <li><a href="#S">S</a></li>
          <li><a href="#T">T</a></li>
          <li><a href="#U">U</a></li>
          <li><a href="#V">V</a></li>
          <li><a href="#W">W</a></li>
          <li><a href="#X">X</a></li>
          <li><a href="#Y">Y</a></li>
          <li><a href="#Z">Z</a></li>
        </ul>
      </div>
    </div>
    <div class="mask" v-if="curFocus">
      <ul class="searchList" v-if="searchCitys">
        <li class="searchCity" v-for="(city, index) in searchCitys">
          <a href="javascript:;" @click="checkCity(city)">{{ city }}</a>
        </li>
      </ul>
      <ul class="noData" v-if="!searchCitys">
        <li>
          <a href="javascript:;">没有你要搜索的城市！</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/common/topNav/index'
import location from '@/utils/location'
export default {
  name: 'address',
  components: {
    TopNav
  },
  data() {
    return {
      // 顶部导航
      showContent: {
        showBack: true,
        titleContent: '选择城市'
      },

      curCity: '', // 当前城市
      allCity: [],
      userAddress: {},
      curFocus: false,
      citysName: [], // 所有城市名字
      searchContent: '',
      searchCitys: [],
      checkedCity: '' //选择的城市
    }
  },
  computed: {},
  filters: {
    sub(value) {
      return value.substring(0, 2)
    }
  },
  created() {
    let x = this.$route.query.flag
    alert(x)
    let self = this
    /*
       获取到当前位置
    */
    location(function(url) {
      return self.$http.jsonp(url).then(
        res => {
          if (res.body.status == 0) {
            //  定位当前城市
            self.curCity = res.body.result.addressComponent.city.replace(
              /市/,
              ''
            )
          }
        },
        err => {
          console.log(err)
        }
      )
    })
    /*
       获取全部城市
    */
    this.$http.get('/citys/all').then(
      res => {
        if (res.body.status === '0') {
          /*a-z 的数据*/
          for (let key in res.body.result) {
            let param = {}
            param.flage = key
            param.names = res.body.result[key]
            self.allCity.push(param)
          }
          /*所有城市名字*/
          for (let key in res.body.result) {
            for (let i = 0; i < res.body.result[key].length; i++) {
              this.citysName.push(res.body.result[key][i].cityname)
            }
          }
        }
      },
      err => {
        console.log(err)
      }
    )
    /*
       获取用户相关城市信息
    */
    let userId = getCookie('userId')
    this.$http.get('/users/address', { params: { userId: userId } }).then(
      res => {
        if (res.body.status === '-1') {
          /*cookie过期*/
          alert(0)
        } else if (res.body.status === '1') {
          this.userAddress = res.body.result
        }
      },
      err => {}
    )
  },
  methods: {
    /*搜索框获取焦点*/
    translate() {
      this.curFocus = true
    },
    toTranslate() {
      this.curFocus = false
      this.searchContent = ''
      this.searchCitys = []
    },
    searchCity() {
      this.searchCitys = []
      this.citysName.forEach(item => {
        let index = item.indexOf(this.searchContent)
        if (index > -1) {
          this.searchCitys.push(item)
        }
      })
    },
    /*选中city*/
    checkCity(cityname) {
      let flag = this.$route.query.flag
      this.$router.push({
        path: '/home',
        query: { checkedCity: cityname, flag: flag }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.checkAddress {
  width: 100%;
  background-color: #edf1fa;
  padding-bottom: 20px;
  position: relative;
  .positionGroup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 99;
  }
  /*s搜索*/
  .search {
    margin-top: 8px;
    margin-bottom: 0px;
    width: 100%;
    padding: 6px 10px;
    box-sizing: border-box;
    position: relative;
    background-color: #edf1fa;
    input {
      list-style: none;
      display: block;
      width: 100%;
      border: none;
      border-radius: 6px;
      height: 36px;
      outline: none;
      text-indent: 34px;
    }
    .icon-search {
      position: absolute;
      margin-top: 10px;
      font-size: 16px;
    }
    .icon-search::after {
      content: '\e903';
      padding: 0 6px;
      color: #d5d5d5;
    }
  }

  /*快速定位*/
  .quick-location {
    margin-top: 100px;
    width: 100%;
    padding: 0 12px 20px 16px;
    background-color: #fff;
    box-sizing: border-box;
    .location {
      width: 90%;
      /*background-color: #1fcca9;*/
      font-size: 14px;
      .location-item {
        span {
          display: inline-block;
          color: #bdbdbd;
          margin-top: 10px;
        }
        .item-box {
          .city-name {
            text-align: left;
            width: 25%;
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            float: left;
            a {
              display: inline-block;
              border-radius: 6px;
              border: 1px solid #bdbdbd;
              padding-left: 22%;
              padding-right: 22%;
              color: #000;
            }
          }
        }
      }
    }
  }

  /*字母定位*/
  .spell-location {
    width: 100%;
    box-sizing: border-box;
    .city {
      margin-top: 10px;
      .city-litter {
        margin-left: 16px;
        display: inline-block;
        margin-bottom: 6px;
      }
      .city-list {
        padding-left: 16px;
        padding-bottom: 10px;
        background-color: #fff;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        li {
          border-bottom: 1px solid #f2f2f2;
          line-height: 42px;
          a {
            color: black;
          }
        }
      }
    }
  }
  /*字母链接*/
  .link-address {
    position: fixed;
    top: 100px;
    right: 10px;
    text-align: center;
    font-size: 12px;
    line-height: 19px;
    .link-item {
      li {
        a {
          color: #1fcca9;
        }
      }
    }
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #d5d5d5;
  }
  /*搜索获取焦点*/
  .searchActive {
    position: fixed;
    top: 0;
    z-index: 999;
    .search {
      margin-top: 0;
      transition: all 0.5s;
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: #e2e2e2;
    position: fixed;
    top: 0;
    z-index: 100;
    .searchList {
      margin-top: 46px;
      padding-left: 16px;
      padding-bottom: 10px;
      .searchCity {
        line-height: 42px;
        border-bottom: 1px solid #f2f2f2;
        a {
          color: #363636;
        }
      }
    }
  }
}
</style>
