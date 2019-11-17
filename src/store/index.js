/*
 * @Author: your name
 * @Date: 2019-11-17 14:42:40
 * @LastEditTime: 2019-11-17 15:30:03
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \12306\src\store\index.js
 */
/**
 * Created by Administrator on 2017/10/4.
 */

import user from './modules/user'
import cityInfo from './modules/cityInfo'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  checkedTime: '10月20日'
}
const getters = {}

const mutations = {
  changeTime(state, data) {
    state.checkedTime = data
  }
}

const actions = {}
const store = new Vuex.Store({
  state,
  getters,
  mutations
})
export default store
