const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		teammatesList:[
			{
				uid:1,
				requestId:0,
				username:"张三",
				phone:"18888888888",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
			},
			{
				uid:2,
				requestId:1,
				username:"张三",
				phone:"18888888888",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
			},
		]
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
	mateClick: function(e) {
		var that = this;
		//获取当前的下标并传递teammate到任务界面
		var idx = (e.currentTarget.dataset.index);
		var teammate = JSON.stringify(that.data.teammatesList[idx]);
    wx.navigateTo({
      url: '/pages/home/matetasks/index?teammate=' + teammate,
		})
	},
});
