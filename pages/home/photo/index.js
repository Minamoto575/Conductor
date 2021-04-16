const app = getApp();

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		location:'湖北省孝感市大悟县大悟县彭店乡田卢家冲',
		photo1: '',
		photo2:'https://conductor-cqm.oss-cn-beijing.aliyuncs.com/beb36371df6641c197150f40612c70d9td4d0X6Ze0xib893bebc9498efa3abdf0ec84810ce1d.png?Expires=1620014391&OSSAccessKeyId=LTAI5tKgzzupwH6M2WV1pU5f&Signature=%2Fm9pND4Ax66544o%2FXxuNCVAvwuI%3D'
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
