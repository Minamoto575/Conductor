const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		current: 0,
		lines: 0,
		photo: '',
		keyword: '',
		swiperlist: [],
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
			}
		],
		Headlines: [{
			id: 1,
			title: "昨日又有34名志愿者加入，欢迎他们！",
			type: 1
		}, {
			id: 2,
			title: "平台已累计救援100名老人！",
			type: 2
		}, {
			id: 3,
			title: "队员**找到了陈五老人！",
			type: 3
		}],
		//救援信息的列表
		availableTaskList: [],
		//一个列表，存储当前位置到目标位置的距离
		distances: [],
		//队员当前所在经纬度
		latitude: 0,
		longitude: 0,
		//显示队员当前所在的位置
		location: ''
	},

	onLoad: function () {
		var that = this;
		var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min');
		var qqmapsdk = new QQMapWX({
			key: 'QAJBZ-GHTCJ-42IFA-FFVGC-FT5IO-ZYBI6'
		});
		/*console.log(app.globalData.StatusBar);
		console.log(app.globalData.CustomBar);*/

		//授权登录
		// wx.getSetting({
		// 	success: res => {
		// 		if (!res.authSetting['scope.userInfo']) {
		// 			wx.redirectTo({
		// 				url: '/pages/auth/auth'
		// 			})
		// 		}
		// 	}
		// });

		//获取任务列表数据
		wx.request({
			url: app.globalData.url + '/task/available',
			header: {
				'JSESSIONID': app.globalData.userInfo.sessionId,
			},
			success(e) {
				var tasks = e.data.data
				console.log(tasks);
				that.setData({
					availableTaskList: tasks
				})
				for (let i = 0; i < tasks.length; i++) {
					if (i >= 4)
						break;
					that.data.swiperlist.push({
						id: i,
						url: tasks[i].photo,
						type: (i + 1)
					})
					that.setData({
						swiperlist: that.data.swiperlist
					})
				}
				//获得任务列表后，构造与之对应的距离列表
				that.getDistance();
			}
		})

		//登录小程序后获取当前地理位置
		wx.getLocation({
			type: 'gcj02',
			isHighAccuracy:true,
			success: function (res) {
				console.log(res.latitude);
				console.log(res.longitude);
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
				//向后台更新队员的位置
				wx.request({
					url: app.globalData.url+'/user/updateLocation',
					method: "POST",
					header: {
						'JSESSIONID': app.globalData.userInfo.sessionId,
					},
					data: {
						"latitude": that.data.latitude,
						"longitude": that.data.longitude,
						"uid": app.globalData.userInfo.uid
					},
					success(e) {
						console.log(e);
					}
				})
			}
		});
		//得到列表后根据当前位置和目标位置的距离对列表进行排序

	},

	//切换回主界面触发
	onShow: function () {
		var that = this;
		//获取任务列表数据
		wx.request({
			url: app.globalData.url+'/task/available',
			header: {
				'JSESSIONID': app.globalData.userInfo.sessionId,
			},
			success(e) {
				var tasks = e.data.data
				console.log(e.data.data);

				that.setData({
					availableTaskList: tasks
				})
				//获得任务列表后，构造与之对应的距离列表
				that.getDistance();
			}
		})
	},

	swiperchange: function (e) {
		this.setData({
			current: e.detail.current
		});
	},
	swipclick: function (e) {
		let that = this;
		var swip = that.data.swiperlist[that.data.current];
		console.log(swip);
		if (swip.type === 1 && app.globalData.userInfo.uid != -1) {
			wx.navigateTo({
				//寻找队友
				url: '/pages/home/teammate/index?id=' + swip.id
			});
		}
	},
	lineschange: function (e) {
		this.setData({
			lines: e.detail.current
		});
	},

	linesclick: function (e) {
		let that = this;
		var swip = that.data.Headlines[that.data.current];
		console.log(swip);
		if (swip.type === 1 && app.globalData.userInfo.uid != -1) {
			wx.navigateTo({
				url: '/pages/home/teammate/index?id=' + swip.id
			});
		}
	},
	itemckcred: function (e) {
		let that = this;
		var item = e.currentTarget.dataset;
		console.log(item.index, item.itemtype)
		if (item.itemtype === 1 && app.globalData.userInfo.uid != -1) {
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
					//console.log(photo);
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
		if (item.itemtype === 3 && app.globalData.userInfo.uid != -1) {
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
	getKeyword: function (e) {
		var that = this
		//将value添加到定义data中
		that.setData({
			keyword: e.detail.value
		})
	},
	//搜索
	search: function (e) {
		var keyword = this.data.keyword;
		console.log(keyword);
		if (keyword != null && keyword != '') {
			wx.navigateTo({
				//搜素信息
				url: '/pages/home/search/index?keyword=' + keyword
			});
		}
	},
	//点击某个救援任务跳转到下一页面，并将参数传递给下一个页面
	taskClick: function (e) {
		var that = this;
		//获取当前的下标
		var idx = (e.currentTarget.dataset.index);
		console.log(idx);
		//将json串转化为字符串
		//var detailTask = JSON.stringify(that.data.availableTaskList[idx]);
		var requestId = that.data.availableTaskList[idx].requestId;
		console.log(requestId);
		//跳转到详细页面并传递对象参数
		wx.navigateTo({
			url: '/pages/taskdetails/details?requestId=' + requestId,
		})
	},
	async getDistance() {
		var that = this;
		var dists = [];
		for (var i = 0; i < that.data.availableTaskList.length; i++) {
			var dist = await util.getDistance(that.data.availableTaskList[i].latitude, that.data.availableTaskList[i].longitude)
			dists.push(dist / 1000);
		}
		that.setData({
			distances: dists
		})

	}
});