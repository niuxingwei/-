<template>
  <div class="time">
    <div class="topCon">
      <span class="tips">车票已调整为30天，您可以预约抢票</span>
      <ul class="timeMark">
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
    </div>
    <div class="timeContainer">
      <div class="timeList" v-for="(itemList,index) in m_rowArr">
        <div class="timeText">
          <span class="line fl"></span>
          <span class="text">{{year}}年{{itemList[0].month}}月</span>
          <span class="line fr"></span>
        </div>
        <ul class="itemList">
          <!-- <li class="item" v-for="(item,ind) in itemList[0].days"  :class="(index===currentIndex ? 'active':'className')" @click="curentIndex =index">-->
          <li class="item" v-for="(item,ind) in itemList[0].days">
            <span v-for="(time,ind) in item.row" @click="getCheckDate(year,itemList[0].month,time)">
              <!--v-if="index ===0 && day < time"-->
              <a href="javascript:;" :class="(index ===0 && day > time) ? 'past':''" v-if="!(index ===0 && day == time)">{{time}}</a>
              <a href="javascript:;" :class="(index ===0 && day == time) ? 'today':''" v-if="index ===0 && day == time">今天</a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import timer from '../../../utils/datepicker'
export default {
  data () {
    return {
      year: "",
      month: "",
      day: "",
      m_rowArr: [],
    }
  },
  components: {


  },
  computed: {

  },
  methods: {
    getCheckDate (year, month, day) {
      //该时间段已无车次
      if (month === this.month + 1 && day < this.day) {
        alert("！");
        return;
      }
      year = year + '年';
      month = month + "月";
      day = day + '日';
      /*修改值*/
      this.$store.commit('changeTime', month + day);
      /*隐藏蒙版*/
      this.$emit('time-mask');

    }
  },
  mounted () {
    let date = new Date();
    this.year = date.getFullYear();  // 年份
    this.month = date.getMonth();  //月份(比正常显示的小1)
    this.day = date.getDate();  //日期

    /*显示当前月份以后的日期*/
    let months = [];
    for (let i = date.getMonth() + 1; i < 13; i++) {
      months.push(i);
      let params = {
        year: this.year,
        month: i - 1,
        day: date.getDate()
      };
      this.m_rowArr.push(timer.prototype.dealTime(params));
    }
  }

}
</script>

<style lang="less">
.time {
  width: 100%;
  /*height:100%;*/
  .topCon {
    width: 100%;
    /*position:fixed;*/
    /*top:0;*/
    /*left:0;*/
    .tips {
      display: inline-block;
      width: 100%;
      height: 46px;
      padding-left: 6px;
      padding-top: 6px;
      box-sizing: border-box;
      background-color: rgb(229, 223, 183);
    }
    .timeMark {
      width: 100%;
      display: flex;
      background-color: #eee;
      padding: 10px 0;
      li {
        flex: 1;
        text-align: center;
      }
    }
  }

  .timeContainer {
    width: 100%;
    /*margin-top:88px;*/
    .timeList {
      width: 100%;
      .timeText {
        width: 100%;
        padding: 10px 0;
        text-align: center;
        .line {
          display: inline-block;
          width: 34%;
          height: 0;
          border-bottom: 1px solid #eee;
          margin-top: 10px;
        }
        .text {
          font-size: 16px;
        }
      }
      .itemList {
        width: 100%;
        li {
          display: flex;
          text-align: center;
          padding: 18px 0;
          span {
            flex: 1;
            a {
              color: #515151;
            }
          }
        }
      }
    }
  }
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.past {
  color: #ddd !important;
}
.today {
  background-color: #42b983;
  display: inline-block;
  border-radius: 6px;
  padding: 0 4px 4px 4px;
  color: #045733 !important;
}
</style>
