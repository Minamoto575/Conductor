const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar + 6,
        TabbarBot: app.globalData.tabbar_bottom,
        swiperlist: [
            'https://image.weilanwl.com/img/4x3-1.jpg',
            'https://image.weilanwl.com/img/4x3-2.jpg',
            'https://image.weilanwl.com/img/4x3-3.jpg',
            'https://image.weilanwl.com/img/4x3-4.jpg',
        ],
        detailTask: {
            // requestId:3,
            // lostName:"王五",
            // lostAge:70,
            // photo:"https://image.weilanwl.com/img/4x3-1.jpg",
            // latitude:31.22,
            // longitude: 113.00,
            // lostAddress: "湖北省武汉市青山区翠园社区xxxx",
            // lostPhone: "13000000002",
            // detail:"走失时穿着白色上衣，长发",
            // status:"进行中",
            // rescueNum:0,
            // gmtCreate:1615971759220
        }
    },
    //初始化时获取上个页面跳转时传过来的参数
    //然后根据此参数去请求具体信息
    onLoad: function (options) {
        var that=this
        //console.log(options.detailTask);
        var detailTask = JSON.parse(options.detailTask);
        that.setData({
            detailTask: detailTask
        });
        console.log(that.data.queryBean)
    }
});
