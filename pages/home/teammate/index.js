const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		taskList:[
			{
				requestId:1,
				lostName:"张三",
				lostAge:70,
				lostGender:"男",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				latitude:31.22,
				longitude: 113.00,
				lostAddress: "湖北省武汉市青山区翠园社区xxxx",
				lostPhone: "13000000002",
				detail:"走失时穿着白色上衣，长发",
				status:"未受理",
				rescueNum:0,
				gmtCreate:1615971759220
			},
			{
				requestId:2,
				lostName:"李四",
				lostAge:70,
				lostGender:"男",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				latitude:30.527888,
				longitude: 114.358063,
				lostAddress: "湖北省武汉市青山区翠园社区xxxx",
				lostPhone: "13000000002",
				detail:"走失时穿着白色上衣，长发",
				status:"进行中",
				rescueNum:0,
				gmtCreate:1615971759220
			},
			{
				requestId:3,
				lostName:"王五",
				lostAge:70,
				lostGender:"男",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				latitude:30.594405,
				longitude: 114.394155,
				lostAddress: "湖北省武汉市青山区翠园社区xxxx",
				lostPhone: "13000000002",
				detail:"走失时穿着白色上衣，长发",
				status:"进行中",
				rescueNum:0,
				gmtCreate:1615971759220
			},
			{
				requestId:4,
				lostName:"啊啊啊",
				lostAge:70,
				lostGender:"男",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				latitude:30.581706,
				longitude: 114.273069,
				lostAddress: "湖北省武汉市青山区翠园社区xxxx",
				lostPhone: "13000000002",
				detail:"走失时穿着白色上衣，长发",
				status:"进行中",
				rescueNum:0,
				gmtCreate:1615971759220
			},
			{
				requestId:5,
				lostName:"哦哦哦",
				lostAge:70,
				lostGender:"男",
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				latitude:31.22,
				longitude: 113.00,
				lostAddress: "湖北省武汉市青山区翠园社区xxxx",
				lostPhone: "13000000002",
				detail:"走失时穿着白色上衣，长发",
				status:"进行中",
				rescueNum:0,
				gmtCreate:1615971759220
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
	taskClick: function(e) {
		var that = this;
		//获取当前的下标
		var idx = (e.currentTarget.dataset.index);
		console.log(idx);
		//将json串转化为字符串
		//var detailTask = JSON.stringify(that.data.availableTaskList[idx]);
		//console.log(detailTask);
		//跳转到详细页面并传递对象参数
    wx.navigateTo({
      url: '/pages/home/mateinfo/index',
    })
	},
});
