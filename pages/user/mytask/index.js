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
		taskList:[
			{
				requestId:1,
				lostName:"张三",
				lostAge:70,
				lostGender:"男",
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
				lostGender:"男",
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
				lostGender:"男",
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
				lostGender:"男",
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
				lostGender:"男",
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
        distances:[]
    },
    onLoad: function (options) {
        let that = this;
        //获取未进行的任务列表，置于taskList中

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
		var dists = [];
		for (var i = 0; i < that.data.taskList.length; i++) {
			var dist = await util.getDistance(that.data.taskList[i].latitude, that.data.taskList[i].longitude)
			dists.push(dist / 1000);
		}
		console.log(dists);
		that.setData({
			distances: dists
		})
		//return dists;
	}
});
