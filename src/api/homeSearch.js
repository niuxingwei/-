/*
 * @Author: 牛兴炜
 * @Date: 2019-11-28 08:45:24
 * @LastEditTime: 2019-12-02 16:44:08
 * @LastEditors: Please set LastEditors
 * @Description: 查询界面的查询按钮参数传递
 * @FilePath: \12306\src\api\homeSearch.js
 */


import http from '@/utils/request'

// 传递始发站、终点站、时间以及是否选择学生票

export function homeSearchBySelect(sstaion,estation,radio,time){
  console.log("前端home传递数据")
  const data={
    SStation:sstaion,
    EStation:estation,
    redio:radio,
    selectedTime:time
  }
  
  console.log(data)
  return http({
    url:'api/home/homeSearch',
    method:'post',
    data
  })
}
// 传递选择类别参数
export function searchType(options){
  console.log("前端选择类别传递数据")
  const data={
   searchtype:options
  }
  
  console.log(data)
  return http({
    url:'api/home/searchType',
    method:'post',
    data
  })
}