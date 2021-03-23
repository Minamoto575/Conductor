const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        TabbarBot: app.globalData.tabbar_bottom,
        TabCur: 0,scrollLeft:0,
        SortMenu: [{id:0,name:"任务列表"},{id:1,name:"队员列表"}],
        keyword:'',
        tasks:[
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
        ],
        teammates:[
            {
                uid:110,
				username:"队员",
				age:18,
                gender:"男",
                phone:18888888888,
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				address: "湖北省武汉市青山区翠园社区xxxx",
            },
            {
                uid:110,
				username:"队员2",
				age:18,
                gender:"男",
                phone:18888888888,
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				address: "湖北省武汉市青山区翠园社区xxxx",
            },
            {
                uid:110,
				username:"队员3",
				age:18,
                gender:"男",
                phone:18888888888,
				photo:"https://image.weilanwl.com/img/4x3-1.jpg",
				address: "湖北省武汉市青山区翠园社区xxxx",
			},
        ]
    },
    onLoad: function (options) {
        this.setData({
			keyword: options.keyword
        });
        //getSearchRes();
    },
    tabSelect(e) {
        console.log(e.currentTarget.dataset.id);
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id-1)*60
        })
    },
    //获取关键词
	getKeyword:function(e){
        var that = this
        //将value添加到定义data中
        that.setData({
          keyword:e.detail.value
        })
    },
    //获取搜索结果
    getSearchRes:function(){
        if(keyword!=null&&keyword!=''){
            //
        }
        
    },
    //任务详情
    taskClick: function(e) {
		var that = this;
		//获取当前的下标
		var idx = (e.currentTarget.dataset.index);
		//将json串转化为字符串
		var detailTask = JSON.stringify(that.data.tasks[idx]);
		//跳转到详细页面并传递对象参数
        wx.navigateTo({
            url: '/pages/taskdetails/details?detailTask=' + detailTask,
        })
	},
});
