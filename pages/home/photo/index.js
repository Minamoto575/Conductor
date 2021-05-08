const app = getApp();

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		location:'湖北省十堰市竹山县竹山县楼台乡度筲',
		photo1: '',
		photo2:'https://conductor-cqm.oss-cn-beijing.aliyuncs.com/faa06ab9e80a489cacdd7d18d94256cbO0AgBThgb5atb893bebc9498efa3abdf0ec84810ce1d.png?Expires=1621933985&OSSAccessKeyId=LTAI5tKgzzupwH6M2WV1pU5f&Signature=NWc2TdXvEqKYHAW0RGWG4ng1%2Bv8%3D'
	},
	onLoad: function (options) {
		this.setData({
			photo1: options.photo
		});
	    wx.getSetting({
	        success: res => {
		        if (!res.authSetting['scope.userInfo']) {
		            wx.redirectTo({
		              	url: '/pages/auth/auth'
		            })
		        }
	        }
			});		
	}
});
