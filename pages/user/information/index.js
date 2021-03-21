const app = getApp();
const utils = require("../../../utils/util.js")
var date = new Date();
var curYear = date.getFullYear();
Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		TabbarBot: app.globalData.tabbar_bottom,
    hidden: true,
    genders: ['男', '女'],
		uid:1,
		username: '?',
    phone:110,
    //后端存储出生年 前端展示年龄
    bir:1999,
    age: 0,
    //gender 在数据库中为string 记得转换
		gender:1,
		address:"武汉大学",
		longitude:0,
    latitude:0,
	},
	onLoad: function (option) {
    //获取队员信息
    this.setData({
      age:curYear-this.data.bir
    })
	},
	
	//住址选择
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
          .then(addresss => {
              that.setData({
									address : addresss
              });
					});

	},
	
	formSubmit(e) {
		console.log("submit 成功")
    //提交前要把一些属性改为number类型
    // e.detail.value.lostAge = parseInt(e.detail.value.lostAge)
    // e.detail.value.latitude = parseFloat(e.detail.value.latitude)
    // e.detail.value.longitude = parseFloat(e.detail.value.longitude)
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //记得处理图片
  },

  //修改性别
  genderChange: function(e) {
    this.setData({
      gender:e.detail.value
    })
  },

  //修改年龄
  ageChange: function(e){
    console.log(e.detail.data);
    var cur = date.getFullYear();
    this.setData({
      bir:e.detail.value
    })
    this.setData({
      age: curYear-e.detail.value
    })
  }
});
