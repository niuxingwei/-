<!--
 * @Author: your name
 * @Date: 2019-10-29 15:15:15
 * @LastEditTime: 2019-10-29 15:15:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \simple-login-master\src\components\topNav\index.vue
 -->
<template>
  <div class="topBar">
    <a href="javascript:;" class="icon-back" v-if="showContent.showBack" @click="back"></a>
    <span v-if="showContent.titleContent">{{showContent.titleContent}}</span>
  </div>
</template>

<script>
export default {
  name: 'top-nav',
  props: {
    showContent: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less">
.topBar {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background-color: #1fcca9;
  text-align: center;
  a {
    display: inline-block;
    margin-top: 10px;
    float: left;
  }
  span {
    color: white;
    font-size: 18px;
  }
}
.icon-back:before {
  content: "\e901";
  font-size: 24px;
  color: white;
}
</style>
