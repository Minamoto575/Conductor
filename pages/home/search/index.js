const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        TabbarBot: app.globalData.tabbar_bottom,
        TabCur: 0,scrollLeft:0,
        SortMenu: [{id:0,name:"任务列表"},{id:1,name:"队员列表"}],
        keyword:''
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
        //
    }
});
