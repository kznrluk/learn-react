export default function (u) {
    function paddingZero(n) {
      return n > 9 ? n : '0' + n;
    }
  
    var t = new Date(u * 1000);
    t.setTime(t.getTime() + (60 * 60 * 1000));
  
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    var year  = t.getFullYear(),
        month = months[t.getMonth()],
        date  = paddingZero(t.getDate()),
        hour  = paddingZero(t.getHours()),
        min   = paddingZero(t.getMinutes()),
        sec   = paddingZero(t.getSeconds());
  
    var pubdate = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
  
    return pubdate;
  }