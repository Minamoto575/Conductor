const app = getApp();
const utils = require("../../utils/util.js");
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
            // lostGender:"男",
            // photo:"https://image.weilanwl.com/img/4x3-1.jpg",
            // latitude:31.22,
            // longitude: 113.00,
            // lostAddress: "湖北省武汉市青山区翠园社区xxxx",
            // lostPhone: "13000000002",
            // detail:"走失时穿着白色上衣，长发",
            // status:"进行中",
            // rescueNum:0,
            // gmtCreate:1615971759220
        },
        location:""
    },
    //根据对象中的经纬度获取位置
    getLocation: function() {
        var that = this;
        //根据detailTask中的经纬度，调用utils中的地址反解析函数，得到位置
        utils.getLocation(this.data.detailTask.latitude, this.data.detailTask.longitude)
            .then(location => {
                that.setData({
                    location: location
                });
            });
    },
    //初始化时获取上个页面跳转时传过来的参数
    //然后根据此参数去请求具体信息
    onLoad: function (options) {
        var detailTask = JSON.parse(options.detailTask);
        this.setData({
            detailTask: detailTask
        });
        
        //将经纬度转化为具体位置放在location属性中
        this.getLocation();

    }
    
});
