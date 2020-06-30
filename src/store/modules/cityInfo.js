/*
 * @Description: 城市信息
 * @Author: your name
 * @Date: 2020-06-28 19:16:03
 * @LastEditTime: 2020-06-30 11:00:51
 * @LastEditors: Please set LastEditors
 */
const cityInfo = {
  state: {
    cityname: ''

  },
  mutations: {
    // 保存城市名
    set_cityName (state, cityname) {
      sessionStorage.setItem('cityname', cityname) // 添加到sessionStorage
      state.cityname = cityname
    }
    // // 退出，清空用户信息
    // log_out (state) {
    //   sessionStorage.removeItem('cityname') // 移除sessionStorage
    //   state.cityname = '' // 同步的改变store中的状态
    // }
  }

}
export default cityInfo
