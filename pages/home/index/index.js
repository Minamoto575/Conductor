const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		current: 0,lines: 0,
		photo:'',
		keyword:'',
		swiperlist: [{
			id: 0,
			url: 'https://image.weilanwl.com/img/4x3-1.jpg',
			type: 1
		}, {
			id: 1,
			url: 'https://image.weilanwl.com/img/4x3-2.jpg',
			type: 2

		}, {
			id: 2,
			url: 'https://image.weilanwl.com/img/4x3-3.jpg',
			type: 3
		}, {
			id: 3,
			url: 'https://image.weilanwl.com/img/4x3-4.jpg',
			type: 4
		}],
		iconList: [{
			id: 1,
			icon: 'camera',
			color: 'yellow',
			name: '拍照识别',
			type: 1
		}, {
			id: 2,
			icon: 'message',
			color: 'orange',
			name: '家属报案',
			type: 2
		}, {
			id: 3,
			icon: 'friend',
			color: 'red',
			name: '寻找队友',
			type: 3
		},
		{
			id: 4,
			icon: 'location',
			color: 'blue',
			name: '我的位置',
			type: 4
		}],
		Headlines: [{
			id:1,
			title:"测试标题1",
			type: 1
		},{
			id:2,
			title:"测试标题2",
			type: 2
		},{
			id:3,
			title:"测试标题3",
			type: 3
		}],
		//救援信息的列表
		availableTaskList:[
			{
				requestId:1,
				lostName:"张三",
				lostAge:70,
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
		],
		latitude: 0,
		longitude: 0,
		//显示队员当前所在的位置
		location:''
	},
	onLoad: function () {
		var that = this;
		/*console.log(app.globalData.StatusBar);
		console.log(app.globalData.CustomBar);*/
		//授权登录
	    wx.getSetting({
	        success: res => {
		        if (!res.authSetting['scope.userInfo']) {
		            wx.redirectTo({
		              	url: '/pages/auth/auth'
		            })
		        }
	        }
			});
			//登录小程序后获取当前地理位置
			wx.getLocation({
				type: 'gcj02',
				success: function(res) {
					console.log(res);
					that.setData({
						latitude: res.latitude,
						longitude: res.longitude
					});
					//将经纬度转化为具体位置
					util.getLocation(res.latitude, res.longitude)
						.then(location => {
							that.setData({
								location: location
							});
						});
				}
			 });
			 //登陆小程序后请求后台接口得到availableTaskList列表
			 //得到列表后根据当前位置和目标位置的距离对列表进行排序
	},

	swiperchange: function (e) {
		this.setData({
			current:e.detail.current
		});
	},
	swipclick: function (e) {
		let that = this;
		var swip = that.data.swiperlist[that.data.current];
		console.log(swip);
		if (swip.type === 1) {
			wx.navigateTo({
				//寻找队友
				url: '/pages/home/teammate/index?id=' + swip.id
			});
		}
	},
	lineschange: function (e) {
		this.setData({
			lines:e.detail.current
		});
	},
	linesclick: function (e) {
		let that = this;
		var swip = that.data.Headlines[that.data.current];
		console.log(swip);
		if (swip.type === 1) {
			wx.navigateTo({
				url: '/pages/home/teammate/index?id=' + swip.id
			});
		}
	},
	itemckcred: function (e) {
		let that = this;
		var item = e.currentTarget.dataset;
		console.log(item.index,item.itemtype)
		if (item.itemtype === 1) {
			wx.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					var _this = this;
					_this.setData({
						photo: res.tempFilePaths
					})
					var photo = _this.data.photo
					console.log(photo);
					//跳转到照片识别页面并传递对象参数
					 wx.navigateTo({
						url: '/pages/home/photo/index?photo=' + photo
					})
				}
			});
		}
		if (item.itemtype === 2) {
			wx.navigateTo({
				//报案
				url: '/pages/home/report/index?id=' + item.index
			});
		}
		if (item.itemtype === 3) {
			wx.navigateTo({
				url: '/pages/home/teammate/index?id=' + item.index
			});
		}
		if (item.itemtype === 4) {
			//我的位置
			wx.openLocation({
					latitude: that.data.latitude,
					longitude: that.data.longitude,
					scale: 18
				})
		}
	},
	//获取关键词
	getKeyword:function(e){
    var that =this
    //将value添加到定义data中
    that.setData({
      keyword:e.detail.value
		})
  },
	//搜索
	search: function (e) {
		var keyword = this.data.keyword;
		console.log(keyword);
		wx.navigateTo({
			//搜素信息
			url: '/pages/home/search/index?keyword='+keyword
		});
	},
	//点击某个救援任务跳转到下一页面，并将参数传递给下一个页面
	taskClick: function(e) {
		var that = this;
		//获取当前的下标
		var idx = (e.currentTarget.dataset.index);
		//将json串转化为字符串
		var detailTask = JSON.stringify(that.data.availableTaskList[idx]);
		//console.log(detailTask);
		//跳转到详细页面并传递对象参数
    wx.navigateTo({
      url: '/pages/taskdetails/details?detailTask=' + detailTask,
    })
	}
});
