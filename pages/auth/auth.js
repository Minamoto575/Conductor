const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    user:{
      uid: '',
      username:'',
      phone:'',
      age:'',
      gender:'',
      address:'',
      role:1,
      token:''
    }
  },
  formSubmit(e) {
    var phone = e.detail.value.phone;
    // if (!this.logged && e.detail.userInfo) {
    //   app.globalData.userInfo = e.detail.userInfo;
    //   wx.switchTab({
    //     url: '/pages/home/index',
    //   })
    // }
    wx.request({
      //url: 'http://api.fuchuang2.nowcent.cn/user/login?phone='+phone,
      url: 'http://localhost:8433/user/login?phone='+phone,
      success(res){
        app.globalData.userInfo = res.data.data;
        console.log(app.globalData.userInfo)
        wx.switchTab({
            url: '/pages/home/index/index',
        })
      } 
    })

  },
});
