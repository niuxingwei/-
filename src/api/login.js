/*
 * @Description: 登录请求
 * @Author: your name
 * @Date: 2020-06-26 08:39:24
 * @LastEditTime: 2020-06-30 11:00:08
 * @LastEditors: Please set LastEditors
 */

import http from '@/utils/request'
// 根据账号、密码、角色登录
export function loginByUsername(loginForm) {
  const data = {
    account: loginForm.userAccount, // 账号
    pass: loginForm.userPassword
  }
  console.log('data:', data)
  return http({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}
// 用户注册
export function registerUser(registerForm) {
  console.log('前端传递数据')

  const data = {
    UserName: registerForm.UserName,
    pass: registerForm.pass,
    checkPass: registerForm.checkPass,
    UName: registerForm.Name,
    IDcard: registerForm.ID,
    Email: registerForm.Email,
    Phone: registerForm.Phone
  }
  console.log('data:', data)
  return http({
    url: '/api/admin/register',
    method: 'post',
    data
  })
}
