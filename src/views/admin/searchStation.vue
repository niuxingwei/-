<!--
 * @Author: 牛兴炜
 * @Date: 2019-11-19 16:39:17
 * @LastEditTime: 2019-11-25 10:31:36
 * @LastEditors: Please set LastEditors
 * @Description: 车票查询结果界面
 * @FilePath: \12306\src\views\admin\searchResult.vue
 -->
<template>
  <div class="searchResult">
    <div class="nav">
      <top-nav :showContent="showContent"></top-nav>
    </div>
    <br>
    <!-- 表格；data:显示的数据;stripe:是否为斑马纹table;highlight-current-row:是否要高亮当前行;border:是否带有纵向边框；v-loading:加载数据时显示 -->
    <el-table :row-class-name="tableRowClassName" :data="queryTicketTable" stripe border v-loading="dataListLoading">
      <el-table-column header-align="center" align="center" width="55" type="index" label="  "></el-table-column>
      <el-table-column prop="City" header-align="center" align="center" label="City"></el-table-column>
      <el-table-column prop="Province" header-align="center" align="center" label="Province"></el-table-column>
      <el-table-column prop="Balance" header-align="center" align="center" label="Balance ">
        <template slot-scope="scope">
          <el-progress :percentage='scope.row.Balance'></el-progress>
        </template>
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
        titleContent: '车站查询结果'
      },
      dataListLoading: false,// 表单加载进度条
      // 表格
      queryTicketTable: [],
      // 分页
      totalPage: 4,
      pageIndex: 1,
      pageSize: 10,
    }
  },
  components: {
    TopNav
  },
  created () {
    this.getDataList()
    // this.tableRowClassName()
  },

  methods: {
    /**
     * @description: 车站信息查询
     * @param {type} 
     * @return: 车站列表信息
     */
    getDataList () {
      this.dataListLoading = true
      // 获取数据，最后要将dataListLoading设置为false
      // alert("数据已获取！")
      this.queryTicketTable = [
        { City: '北京', Province: '北京', Balance: 20 },
        { City: '邯郸', Province: '河北', Balance: 40 },
        { City: '晋城', Province: '山西', Balance: 35 },
        { City: '青岛', Province: '山东', Balance: 28 }
      ]
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