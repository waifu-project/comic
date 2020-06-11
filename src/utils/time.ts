/**
 * 参考: https://github.com/zxccvms/dateAgo/blob/master/index.js
 */
const dispose = (dateTimeStamp: any) => {
  var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();   //获取当前时间毫秒
  // console.log(now)
  var diffValue = now - dateTimeStamp;//时间差

  if (diffValue < 0) return

  var minC: any = diffValue / minute;  //计算时间差的分，时，天，周，月
  var hourC: any = diffValue / hour;
  var dayC: any = diffValue / day;
  var weekC: any = diffValue / week;
  var monthC: any = diffValue / month;

  var result = ''

  if (monthC >= 1 && monthC <= 11) {
    result = " " + parseInt(monthC) + "个月前"
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt(weekC) + "周前"
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + parseInt(dayC) + "天前"
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt(hourC) + "小时前"
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "年" + Nmonth + "月" + Ndate + "日"
  }
  return result;
}

export default (time: any) => {
  var dateTimeStamp = Date.now()
  if (time instanceof Date) {
    dateTimeStamp = time.getTime()
  } else if (typeof time == 'string') {
    dateTimeStamp = (new Date(time)).getTime()
  } else if (typeof time == 'number') {
    dateTimeStamp = time;
  }
  return dispose(dateTimeStamp)
}
