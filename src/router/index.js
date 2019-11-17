/*
 * @Author: your name
 * @Date: 2019-10-23 21:43:00
 * @LastEditTime: 2019-11-17 10:25:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \simple-login-master\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'

import errPage from '@/views/common/errPage'
import login from '@/views/Login/login'
import home from '@/views/admin/home'
import register from '@/views/Login/register'
import Address from '@/views/admin/address'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/404',
      name: '404',
      component: errPage
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
