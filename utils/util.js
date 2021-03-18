const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//反地址解析，根据经纬度获得地址信息
const getLocation = function(latitude, longitude) {
  //异步返回结果问题待解决
  var QQMapWX = require('./qqmap-wx-jssdk.min.js');
  var qqmapsdk = new QQMapWX({
      key: 'QAJBZ-GHTCJ-42IFA-FFVGC-FT5IO-ZYBI6'
  });
  //保证异步结果返回
  return new Promise(function(resolve, reject){
      qqmapsdk.reverseGeocoder({
      location: {
          latitude: latitude,
          longitude: longitude
      },
      success: function (res) {
          console.log(res);
          resolve(res.result.address + res.result.formatted_addresses.recommend);
      },
      fail: function(error) {
          console.error(error);
          resolve("???");
      },
      complete: function(res) {
          console.log(res);
      }
  });
  })
}

module.exports = {
  formatTime: formatTime,
  getLocation: getLocation
}
