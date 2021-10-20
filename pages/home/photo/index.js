const app = getApp();
const utils = require("../../../utils/util.js");

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		location: '',
		//本地图片路径
		photo1: '',
		//服务器的图片url
		photo2: '',
		//最相似老人
		confidence: 0,
		//-1显示识别中，0显示识别结果，1显示无相似者
		rtnType:-1,
		task: {}
	},
	onLoad: function (options) {
		var that = this;
		this.setData({
			photo1: options.photo
		});
		// wx.getSetting({
		// 	success: res => {
		// 		if (!res.authSetting['scope.userInfo']) {
		// 			wx.redirectTo({
		// 				url: '/pages/auth/auth'
		// 			})
		// 		}
		// 	}
		// });

		//上传图片
		wx.uploadFile({
			filePath: that.data.photo1,
			name: 'file',
			url: app.globalData.url + '/image/upload',
			header: {
				'content-type': "multipart/form-data"
			},
			success(e) {
				var data = JSON.parse(e.data);
				//图片在后端的url
				that.setData({
					photo2: data.data.url
				})
				//匹配
				console.log(that.data.photo2);
				wx.request({
					url: app.globalData.url + '/image/match?srcUrl=' + that.data.photo2,
					success(res) {
						console.log(res);
						//找到了相似的老人
						if (res.data.code == 0) {
							that.setData({
								confidence: res.data.data.confidence,
								task: res.data.data.task,
								rtnType : 0
							})
							that.getLocation();
						}
						else{
							that.setData({rtnType:1})
						}
					},
				})
			}
		})
	},

	//根据对象中的经纬度获取位置
	getLocation: function () {
		var that = this;
		//根据detailTask中的经纬度，调用utils中的地址反解析函数，得到位置
		utils.getLocation(this.data.task.latitude, this.data.task.longitude)
			.then(location => {
				that.setData({
					location: location
				});
			});
	},

});
