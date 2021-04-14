const app = getApp();
const util = require('../../../utils/util.js');

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        TabbarBot: app.globalData.tabbar_bottom,
        TabCur: 0,scrollLeft:0,
        SortMenu: [{id:0,name:"进行中"},{id:1,name:"已完成"},{id:2,name:"已超时"}],
				//救援信息的列表
				processing: [],
				overdue: [],
				finished: [],
				pdis:[],
				odis:[],
				fdis:[],
    },
    onLoad: function (options) {
        let that = this;
				//获取未进行的任务列表，置于taskList中
				console.log(JSON.parse(options.processing));
				var finished = JSON.parse(options.finished);
				var processing = JSON.parse(options.processing);
				var overdue= JSON.parse(options.overdue);

        that.setData({
						processing:processing,
						finished:finished,
						overdue:overdue
        });

        //获得任务列表后，构造与之对应的距离列表
        this.getDistance();
    },
    tabSelect(e) {
        console.log(e.currentTarget.dataset.id);
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
        //选择一个tab后，记得请求该状态下的任务列表，置于taskList中

        //获得任务列表后，构造与之对应的距离列表
        this.getDistance();


    },
    //点击某个救援任务跳转到详情页面，并将参数传递下去
    taskClick: function(e) {
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
		var pdis=[];
		var odis=[];
		var fdis=[];
		for (var i = 0; i < that.data.processing.length; i++) {
			var dist = await util.getDistance(that.data.taskList[i].latitude, that.data.taskList[i].longitude)
			pdis.push(dist / 1000);
		}
		for (var i = 0; i < that.data.finished.length; i++) {
			var dist = await util.getDistance(that.data.taskList[i].latitude, that.data.taskList[i].longitude)
			fdis.push(dist / 1000);
		}
		for (var i = 0; i < that.data.overdue.length; i++) {
			var dist = await util.getDistance(that.data.taskList[i].latitude, that.data.taskList[i].longitude)
			odis.push(dist / 1000);
		}
		//console.log(dists);
		that.setData({
			pdis:pdis,
			odis:odis,
			fdis:fdis
		})
		//return dists;
	}
});
