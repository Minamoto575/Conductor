const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		teammatesList:[
			{
				name:"张三",
				phone:"18888888888",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
			},
			{
				name:"张三",
				phone:"18888888888",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
			}
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
});
