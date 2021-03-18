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
    //记得处理图片
  },
  //重置
  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  //读取图片
  chooseimage: function () {  
    var _this = this;  
    wx.chooseImage({  
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'],  
      sourceType: ['album'], 
      success: function (res) {  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({  
          tempFilePaths:res.tempFilePaths  
        })  
        wx.getImageInfo({ 
          src: res.tempFilePaths[0], 
          success: function (res) { 
            
          } 
        })  
      }  
    })  
  }  
});

