const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		cases: []
	},
	onLoad: function (options) {
		var uid = options.uid;
		var that = this;
		//获取该队员正在进行任务列表
		wx.request({
			url: app.globalData.url + '/task?uid=' + uid + '&&status=1',
			header: {
				'Authorization': app.globalData.userInfo.uid
			},
			success(e) {
				//console.log(e);
				that.setData({
					cases: e.data.data
				})
			}
		})
	},
});