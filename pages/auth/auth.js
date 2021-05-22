const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  formSubmit(e) {
    var phone = e.detail.value.phone;
    console.log(phone)
    console.log("formsubmit")
    if(phone){
      wx.request({
        url: 'https://api.fuchuang2.nowcent.cn/user/login?phone=' + phone,
        //url: 'http://localhost:8433/user/login?phone=' + phone,
        success(res) {
          app.globalData.userInfo = res.data.data;
          // 错误提示
          if(app.globalData.userInfo.uid == -1){
          //   wx.showModal({
          //     title: 'error',
          //     content: '该号码未注册',
          //     showCancel:false,
          //   })
            wx.showToast({
              title: '该号码未注册',
              icon: 'error',
              duration: 2000
            })
          }
          else{
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
    }
    else{
      wx.showToast({
        title: '手机号码不可空',
        icon: 'error',
        duration: 2000
      })
    }
  },
  tourist() {
    wx.request({
      url: 'https://api.fuchuang2.nowcent.cn/user/login?phone=' + -1,
      //url: 'http://localhost:8433/user/login?phone=' + phone,
      success(res) {
        app.globalData.userInfo = res.data.data;
        console.log(res);
        wx.switchTab({
          url: '/pages/home/index/index',
        })
      }
    })
  },
  login(){
    var query = wx.createSelectorQuery();
    query.select('#phone').node(function (res) {
      console.log(res);  
  })
    query.exec(function (res) {
    console.log(res);  
})
  }
});
