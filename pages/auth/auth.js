const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
  },
  formSubmit(e) {
    var phone = e.detail.value.phone;
    wx.request({
      url: 'https://api.fuchuang2.nowcent.cn/user/login?phone=' + phone,
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
});
