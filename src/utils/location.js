// 定位
 function location(callback) {
     getLocaton(callback);
}
//
function getLocaton(callback) {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
          //    经度
          let latitude = position.coords.latitude;
//    纬度
          let longitude = position.coords.longitude;

          let param = latitude+','+longitude;
          console.log(param);
          let url = "http://api.map.baidu.com/geocoder/v2/?ak=wLCeiRljevH7XQQGSDEbpUsgCTcK0x5H&callback=renderReverse&location="+param+"&output=json&pois=0";
          callback(url);
        },showError);
    }else {
        alert("浏览器不支持地理地位！换个浏览器试试。");
    }
}
//根据经纬度发送请求
function showPosition(position,callback) {
//    经度
    let latitude = position.coords.latitude;
//    纬度
    let longitude = position.coords.longitude;

  let param = latitude+','+longitude;
  let url = "http://api.map.baidu.com/geocoder/v2/?ak=wLCeiRljevH7XQQGSDEbpUsgCTcK0x5H&callback=renderReverse&location="+param+"&output=json&pois=0";
  callback(url);

}

//错误信息
function showError(error) {
    switch (error.code){
        case error.PERMISSION_DENIED:
            alert("定位失败，用户拒绝请求地址地位");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("定位失败，位置信息不可用");
            break;
        case error.TIMEOUT:
            alert("定位失败，请求获取用户位置超时");
            break;
        case error.UNKNOWN_ERR:
            alert("定位失败，定位系统失效");
            break;
    }
}
export default location;
