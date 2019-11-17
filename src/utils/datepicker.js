/*
     自定义手机端日期选择器
*/

function datePicker() {

}

function is_leap(year){  //处理闰年问题
  let res;
  return (year %100 ===0 ? res =(year %400 ===0?1:0) : res =(year %4 ===0?1:0));
}

datePicker.prototype.dealTime =function(params) {
  if (!params){
    return ;
  }
  let resultArr =[];
  let m_rowArr = [];
  let ynow = params.year;  // 年份
  let mnow = params.month;  //月份(比正常显示的小1)
  let dnow = params.day;  //日期
  let mfirst = new Date(ynow,mnow,1);  //当月第一天Date资讯
  let firstDay = mfirst.getDay();  //当月第一天星期几

  // 各月份的天数
  let m_days = new Array(31,28+is_leap(ynow),31,30,31,30,31,31,30,31,30,31);

  // 每个月所占行数
  let m_row = Math.ceil((m_days[mnow] + firstDay)/7);
  let indx, date_str;
  let dateArr = [];
  for (let i=0; i<m_row; i++){
    dateArr = [];
    for (let k=0; k<7;k++){
      indx = i*7 +k ;
      date_str = indx - firstDay +1;
      (date_str <=0 || date_str > m_days[mnow]) ? date_str = "" :date_str = indx - firstDay +1;
      dateArr.push(date_str);
    }
    let obj={
      row:dateArr
    };
    m_rowArr.push(obj);
  }

   let times ={
    // >9 ? (mnow+1) : '0'+(mnow+1)+"月"
    month:(mnow+1),
    days: m_rowArr
   }
   resultArr.push(times);
   return resultArr ;
}


export default datePicker;
