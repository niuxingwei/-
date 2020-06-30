/*
 * @Author: your name
 * @Date: 2020-06-29 21:43:00
 * @LastEditTime: 2020-06-30 11:00:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \simple-login-master\src\router\index.js
 */
import Vue from "vue"
import Router from "vue-router"

import errPage from "@/views/common/errPage"
import login from "@/views/Login/login"
import home from "@/views/admin/home"

import register from "@/views/Login/register"
import Address from "@/views/admin/address"

import searchType from "@/views/admin/searchType"
import searchStation from "@/views/admin/searchStation"

import searchPassenger from "@/views/admin/searchPassenger"
import searchTicket from "@/views/admin/searchTicket"
import searchTrain from "@/views/admin/searchTrain"
Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: login
    },
    {
      path: "/register",
      name: "register",
       component: register
    },
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/address",
      component: Address
    },
    {
      path: "/searchStation",
      component: searchStation
    },
    {
      path: "/searchType",
      component: searchType
    },
    {
      path: "/searchPassenger",
      component: searchPassenger
    },
    {
      path: "/searchTicket",
      component: searchTicket
    },
    {
      path: "/searchTrain",
      component: searchTrain
    },
    {
      path: "/404",
      name: "404",
      component: errPage
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
