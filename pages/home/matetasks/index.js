const app = getApp();
const util = require('../../../utils/util.js');

Page({
	data: {
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		hidden: true,
		cases:[]
	},
	onLoad: function (options) {
	
			var cases = JSON.parse(options.cases);
      this.setData({
          cases: cases
			});
    
	},
});
