const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  formSubmit(e) {
    var phone = e.detail.value.phone;
    var password = e.detail.value.password;
    // console.log("formsubmit")
    if (phone&&password) {
      wx.request({
        method:"POST",
        url: app.globalData.url + '/user/login',
        data:{
          'phone':phone,
          'password':password,
        },
        success(res) {
          app.globalData.userInfo = res.data.data;
          // 错误提示
          if (app.globalData.userInfo.uid == -1) {
            wx.showToast({
              title: '该号码未注册',
              icon: 'error',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '/pages/home/index/index',
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请输入登录信息',
        icon: 'error',
        duration: 2000
      })
    }
  },
  tourist() {
    wx.request({
      method:"POST",
      url: app.globalData.url + '/user/login',
      data:{
        phone:-1,
        paasword:-1,
      },
      success(res) {
        app.globalData.userInfo = res.data.data;
        console.log(res);
        wx.switchTab({
          url: '/pages/home/index/index',
        })
      }
    })
  },
  login() {
    var query = wx.createSelectorQuery();
    query.select('#phone').node(function (res) {
      console.log(res);
    })
    query.exec(function (res) {
      console.log(res);
    })
  }
});