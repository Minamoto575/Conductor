const app = getApp();
const utils = require("../../../utils/util.js")

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		region: ['湖北省', '武汉市', '洪山区'],
		pickerHidden: true,
    chosen: '',
    //走失者位置
    longitude:0,
    latitude:0,
    //选点后的具体位置
    location:'',
    photos: []
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
    //提交前要把一些属性改为number类型
    e.detail.value.lostAge = parseInt(e.detail.value.lostAge)
    e.detail.value.latitude = parseFloat(e.detail.value.latitude)
    e.detail.value.longitude = parseFloat(e.detail.value.longitude)
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
      count: 4, // 默认9  
      sizeType: ['original', 'compressed'],  
      sourceType: ['album'], 
      success: function (res) {  
        _this.setData({
          photos: res.tempFilePaths
        })
      }  
    })  
  } ,
  chooseLocationTapped: function () {
    var that = this;
    //打开地图进行地图选点，此处选点是老人的失踪位置
    wx.chooseLocation({
      success: function(res) {
        console.log(res.address);
        //选点后将经纬度写到属性中，以便后续上传
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        //设置经纬度后，还需要将经纬度转化为具体位置
        that.displayChosenLocation();
      }
    })
  },
  displayChosenLocation: function() {
    var that = this;
      //根据detailTask中的经纬度，调用utils中的地址反解析函数，得到位置
      utils.getLocation(this.data.latitude, this.data.longitude)
          .then(location => {
              that.setData({
                  location: location
              });
          });
  }
});

