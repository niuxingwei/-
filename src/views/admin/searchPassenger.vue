<!--
 * @Author: 牛兴炜
 * @Date: 2019-11-25 08:16:56
 * @LastEditTime: 2019-12-06 15:40:52
 * @LastEditors: Please set LastEditors
 * @Description: 乘客信息查询界面
 * @FilePath: \12306\src\views\admin\searchPassenger.vue
 -->
<template>
  <div class="passenger">
    <div class="nav">
      <top-nav :showContent="showContent"></top-nav>
    </div>
    <br>
    <!-- 表格；data:显示的数据;stripe:是否为斑马纹table;highlight-current-row:是否要高亮当前行;border:是否带有纵向边框；v-loading:加载数据时显示 -->
    <el-table :row-class-name="tableRowClassName" :data="queryPassengerTable" border v-loading="dataListLoading">
      <el-table-column header-align="center" align="center" width="55" type="index" label="  "></el-table-column>
      <el-table-column prop="UName" header-align="center" align="center" label="用户名"></el-table-column>
      <el-table-column prop="Sex" header-align="center" align="center" label="性别">
        <template slot-scope="scope">
          <span v-if=" scope.row.Sex==='男'">
            <svg-icon icon-class="nan"></svg-icon>
          </span>
          <span v-if=" scope.row.Sex==='女'">
            <svg-icon icon-class="nv"></svg-icon>
          </span>
          <span style="margin-left: 5px">{{ scope.row.Sex }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="IDcard" header-align="center" align="center" label="身份证号">
        <template slot-scope="scope">
          <svg-icon icon-class="IDcard"></svg-icon>
          <span style="margin-left: 5px">{{ scope.row.IDcard }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Phone" header-align="center" align="center" label="手机号">
        <template slot-scope="scope">
          <svg-icon icon-class="phone"></svg-icon>
          <span style="margin-left: 5px">{{ scope.row.Phone }}</span>
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
        titleContent: '车票查询结果'
      },
      // 列车查询表单
      queryPassengerTable: [],
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
      let queryPassengerTableTem = []// 将符合的数据存放进去
      this.$route.query.SelectTable.forEach(temCurrent => {
        queryPassengerTableTem.push({
          UName: temCurrent.UName,
          Sex: temCurrent.Sex,
          IDcard: temCurrent.IDcard,
          Phone: temCurrent.Phone
        })
      })
      this.queryPassengerTable = queryPassengerTableTem
      // this.queryPassengerTable = [
      //   { UName: '牛', Sex: '男', IDcard: '61243019960XXX', Phone: '18617771777' },
      //   { UName: '张', Sex: '女', IDcard: '61243019960XXX', Phone: '18617771777' },
      //   { UName: '牛兴', Sex: '男', IDcard: '61243019960XXX', Phone: '18617771777' },
      //   { UName: '张海', Sex: '女', IDcard: '61243019960XXX', Phone: '18617771777' }
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