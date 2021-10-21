const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		TabbarBot: app.globalData.tabbar_bottom,
		TabCur: 0,
		scrollLeft: 0,
		SortMenu: [{
			id: 0,
			name: "进行中"
		}, {
			id: 1,
			name: "已完成"
		}, {
			id: 2,
			name: "已超时"
		}],
		//救援信息的列表
		processing: [],
		overdue: [],
		finished: [],
		showedTask: [],
		showedDis: [],
		pdis: [],
		odis: [],
		fdis: [],
	},
	onLoad: function (options) {
		let that = this;
		//获取正在进行任务列表
		wx.request({
			url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=1',
			header: {
				'JSESSIONID': app.globalData.userInfo.sessionId,
			},
			success(e) {
				//console.log(e);
				that.setData({
					processing: e.data.data,
					showedTask: e.data.data,
				})
				//获取已完成任务列表
				wx.request({
					url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=2',
					header: {
						'JSESSIONID': app.globalData.userInfo.sessionId,
					},
					success(e) {
						//console.log(e);
						that.setData({
							finished: e.data.data
						})
						//获取已超时任务列表
						wx.request({
							url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=3',
							header: {
								'JSESSIONID': app.globalData.userInfo.sessionId,
							},
							success(e) {
								//console.log(e);
								that.setData({
									overdue: e.data.data
								})
								//获得任务列表后，构造与之对应的距离列表
								that.getDistance();
								that.setData({
									showedDis: that.data.pdis
								})
							}
						})
					}
				})
			}
		})

	},
	tabSelect(e) {
		var that = this;
		this.setData({
			TabCur: e.currentTarget.dataset.id,
			scrollLeft: (e.currentTarget.dataset.id - 1) * 60
		})
		switch (e.currentTarget.dataset.id) {
			case 0:
				that.setData({
					showedTask: that.data.processing,
					showedDis: that.data.pdis
				})
				break;
			case 1:
				that.setData({
					showedTask: that.data.finished,
					showedDis: that.data.fdis
				})
				break;
			case 2:
				that.setData({
					showedTask: that.data.overdue,
					showedDis: that.data.odis
				})
				break;
			default:

		}
		//选择一个tab后，记得请求该状态下的任务列表，置于taskList中

	},
	//点击某个救援任务跳转到详情页面，并将参数传递下去
	taskClick: function (e) {
		var that = this;
		//获取当前的下标
		var idx = (e.currentTarget.dataset.index);
		//将json串转化为字符串
		var detailTask = JSON.stringify(that.data.taskList[idx]);
		//console.log(detailTask);
		//跳转到详细页面并传递对象参数
		wx.navigateTo({
			url: '/pages/taskdetails/details?detailTask=' + detailTask,
		})
	},
	async getDistance() {
		var that = this;
		var pdis = [];
		var odis = [];
		var fdis = [];
		for (var i = 0; i < that.data.processing.length; i++) {
			var dist = await util.getDistance(that.data.processing[i].latitude, that.data.processing[i].longitude)
			pdis.push(dist / 1000);
		}
		for (var i = 0; i < that.data.finished.length; i++) {
			var dist = await util.getDistance(that.data.finished[i].latitude, that.data.finished[i].longitude)
			fdis.push(dist / 1000);
		}
		for (var i = 0; i < that.data.overdue.length; i++) {
			var dist = await util.getDistance(that.data.overdue[i].latitude, that.data.overdue[i].longitude)
			odis.push(dist / 1000);
		}
		//console.log(dists);
		that.setData({
			pdis: pdis,
			odis: odis,
			fdis: fdis,
			showedDis: pdis
		})
		//return dists;
	}
});
