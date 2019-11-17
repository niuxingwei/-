/*
 * @Description: 封装axios,对其做相应配置
 * @Author: 
 * @Date: 2019-07-05 14:32:46
 * @LastEditTime: 2019-09-21 15:43:59
 * @LastEditors: Please set LastEditors
*/
import axios from 'axios'
// import { Message } from 'element-ui'
// import QS from 'qs' // 其在axios安装之后自动安装，用来序列化post类型的数据

// 创建axios实例
const http = axios.create({
  // 参考链接: https://blog.csdn.net/qq_41348029/article/details/84133983
  // https://blog.csdn.net/qq_26282869/article/details/86300812
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  // baseURL: process.env.BASE_API // api 的 base_url // url = base url + request url
  // timeout: 5000 // 请求超时时间50秒
})
http.all = axios.all // all为axios的静态方法，axios实例无all方法
http.spread = axios.spread // spread为axios的静态方法，axios实例无spread方法
/**
 * @description: 添加请求拦截
 * @param {type}
 * @return:
 */
// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 要设置请求头中每次都携带token
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log(error) // for debug
  return Promise.reject(error)
})

/**
 * @description: 添加响应拦截
 * @param {type}
 * @return:
 */
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 判断token失效否
  return response
}, function (error) {
  // 对响应错误做点什么
  // console.log('err' + error) // for debug
  // Message({
  //   message: error.message,
  //   type: 'error',
  //   duration: 5 * 1000
  // })
  return Promise.reject(error)
})

// 还可以处理post、get方式请求数据

export default http
