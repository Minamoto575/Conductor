const app = getApp();
const util = require('../../../utils/util.js');


Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		teammatesList:[]
	},
	onLoad: function (option) {
		var that = this;
		//console.log(option.id);
	    // wx.getSetting({
	    //     success: res => {
		  //       if (!res.authSetting['scope.userInfo']) {
		  //           wx.redirectTo({
		  //             	url: '/pages/auth/auth'
		  //           })
		  //       }
	    //     }
			// });
			//获取队友列表
			wx.request({
				url: app.globalData.url + '/user/partner/'+app.globalData.userInfo.uid,
				header: {
					'Authorization': app.globalData.userInfo.uid
				},
				success(e){
					console.log(e);
					var list = e.data.data
					that.setData({
						teammatesList:list
					})
				}
			})
	},

	mateClick: function(e) {
		var that = this;
		//获取当前的下标并传递teammate到任务界面
		var idx = (e.currentTarget.dataset.index);
		//console.log(that.data.teammatesList[idx].cases);
		var uid = that.data.teammatesList[idx].uid;
    wx.navigateTo({
      url: '/pages/home/matetasks/index?uid=' + uid,
		})
	},
});
