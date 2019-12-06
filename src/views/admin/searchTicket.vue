<!--
 * @Author: 牛兴炜
 * @Date: 2019-11-25 08:16:32
 * @LastEditTime: 2019-12-06 15:54:16
 * @LastEditors: Please set LastEditors
 * @Description: 车票信息查询界面
 * @FilePath: \12306\src\views\admin\searchTicket.vue
 -->
<template>
  <div class="ticket">
    <div class="nav">
      <top-nav :showContent="showContent"></top-nav>
    </div>
    <br>
    <!-- 表格；data:显示的数据;stripe:是否为斑马纹table;highlight-current-row:是否要高亮当前行;border:是否带有纵向边框；v-loading:加载数据时显示 -->
    <el-table :row-class-name="tableRowClassName" :data="queryTicketTable" border v-loading="dataListLoading">
      <el-table-column header-align="center" align="center" width="55" type="index" label="  "></el-table-column>
      <el-table-column prop="UName" header-align="center" align="center" label="用户名"></el-table-column>
      <el-table-column prop="Price" header-align="center" align="center" label="价格">
        <template slot-scope="scope">
          <svg-icon icon-class="price"></svg-icon>
          <span style="margin-left: 5px">{{ scope.row.Price }}</span>
        </template>

      </el-table-column>
      <el-table-column prop="BTime" header-align="center" align="center" label="开车时间">
        <template slot-scope="scope">
          <svg-icon icon-class="time"></svg-icon>
          <span style="margin-left: 5px">{{ scope.row.BTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ATIME" header-align="center" align="center" label="到站时间">
        <template slot-scope="scope">
          <svg-icon icon-class="time"></svg-icon>
          <span style="margin-left: 5px">{{ scope.row.ATIME }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="TrainNumber" header-align="center" align="center" label="列车号"></el-table-column>
      <el-table-column prop="BStatiom" header-align="center" align="center" label="始发站"></el-table-column>
      <el-table-column prop="AStion" header-align="center" align="center" label="到达站 ">
      </el-table-column>
    </el-table>
    <br>
    <br>
    <!-- 分页；total：总条目数；current-page：当前页数；page-size：每页显示条目个数;current-change:当前页改变时触发-->
    <div style="text-align:right">
      <el-pagination @current-change="currentChangeHandle()" :total="totalPage" :current-page="pageIndex" :page-size="pageSize" layout="total,prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import TopNav from '@/components/common/topNav/index'
export default {

  data () {
    return {
      //顶部导航
      showContent: {
        showBack: false,
        titleContent: '车票查询结果'
      },
      // 车票查询表单
      queryTicketTable: [],
      // 分页
      totalPage: 4,
      pageIndex: 1,
      pageSize: 10
    }
  },
  components: {
    TopNav
  },
  created () {
    this.getDataList()
  },

  methods: {
    /**
       * @description: 车票信息查询
       * @param {type} 
       * @return: 车站列表信息
       */
    getDataList () {
      this.dataListLoading = true
      // 获取数据，最后要将dataListLoading设置为false
      // alert("数据已获取！")
      let queryTicketTableTem = []// 将符合的数据存放进去
      this.$route.query.SelectTable.forEach(temCurrent => {
        queryTicketTableTem.push({
          UName: temCurrent.UName,
          Price: temCurrent.Price,
          BTime: temCurrent.BTime,
          ATIME: temCurrent.ATIME,
          TrainNumber: temCurrent.TrainNUmber,
          BStatiom: temCurrent.BStation,
          AStion: temCurrent.AStation
        })
      })
      this.queryTicketTable = queryTicketTableTem
      console.log(this.queryTicketTable)
      // this.queryTicketTable = [
      //   { UName: '牛兴炜', Price: '197', BTime: '2019-10-01 14:23:12', ATIME: '2019-10-02 10:00:46', TrainNumber: 'K279', BStatiom: '北京西', AStion: '十堰' }
      // ]
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
  }
}
</script>

<style  scoped>
.nav {
  background-color: #1fcca9;
}
.warning-row {
  background: green;
}
.success-row {
  background: green;
}
</style>