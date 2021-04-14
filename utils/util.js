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
          //console.log(res);
          resolve(res.result.address + res.result.formatted_addresses.recommend);
      },
      fail: function(error) {
          //console.error(error);
          resolve("???");
      },
      complete: function(res) {
          //console.log("get location completed");
      }
  });
  })
}

//求到目标位置的距离
const getDistance = function(latitude, longitude) {
  var QQMapWX = require('./qqmap-wx-jssdk.min.js');
  var qqmapsdk = new QQMapWX({
      key: 'QAJBZ-GHTCJ-42IFA-FFVGC-FT5IO-ZYBI6'
  });
  return new Promise(function(resolve, reject) {
    qqmapsdk.calculateDistance({
      from:'',
      to: [{
        latitude: latitude,
        longitude: longitude
      }],
      success: function(res) {
        //console.log(res);
        var dist = res.result.elements[0].distance;
        resolve(dist);
      },
      fail: function(error) {
        //console.error(error);
        resolve("?");
      },
      complete: function(res) {
        //console.log("calculate distance completed");
      }
    })
  })
  
}

module.exports = {
  formatTime: formatTime,
  getLocation: getLocation,
  getDistance: getDistance
}
