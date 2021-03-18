const app = getApp();

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		region: ['湖北省', '武汉市', '洪山区'],
		pickerHidden: true,
    chosen: ''
	},
	onLoad: function (option) {
		console.log(option.id);
	    wx.getSetting({
	        success: res => {
		        if (!res.authSetting['scope.userInfo']) {
		            wx.redirectTo({
		              	url: '/pages/auth/auth'
		            })
		        }
	        }
	    });
  },
  //地址选择
	RegionChange: function (e) {
		this.setData({
			region: e.detail.value
		})
	},

  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },
  //提交事件  
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  //重置
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  }
});

