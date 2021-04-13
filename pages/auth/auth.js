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
    console.log(phone);
    wx.switchTab({
      url: '/pages/home/index/index',
    })
    // if (!this.logged && e.detail.userInfo) {
    //   app.globalData.userInfo = e.detail.userInfo;
    //   wx.switchTab({
    //     url: '/pages/home/index',
    //   })
    // }
    // wx.request({
    //   url: 'http://xx.com/user/login?phone'+phone,
    //   success(res){
    //     var user = res.data;
    //     this.setData({
    //       user:user
    //     })
    //     wx.switchTab({
    //         url: '/pages/home/index',
    //     })
    //   }
      
    // })    
  },
});
