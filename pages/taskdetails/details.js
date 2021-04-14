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
        detailTask: {},
        location: ""
    },
    //根据对象中的经纬度获取位置
    getLocation: function () {
        var that = this;
        //根据detailTask中的经纬度，调用utils中的地址反解析函数，得到位置
        utils.getLocation(this.data.detailTask.latitude, this.data.detailTask.longitude)
            .then(location => {
                that.setData({
                    location: location
                });
            });
    },

    //接受任务
    accept: function (e) {
        var that = this;
        wx.request({
            url: 'http://api.fuchuang2.nowcent.cn/user/accept',
            //url: 'http://localhost:8433/user/accept',
            method: "POST",
            data: {
                'uid':app.globalData.userInfo.uid,
                'requestId':that.data.detailTask.requestId
            },
            header: {
                'Authorization': app.globalData.userInfo.uid,
            },
            success(e) {
                console.log(e);
            }
        })
    },

     //完成任务
     finnish: function (e) {
        var that = this;
        wx.request({
            url: 'http://api.fuchuang2.nowcent.cn/user/complete',
            //url: 'http://localhost:8433/user/complete',
            method: "POST",
            data: {
                'uid':app.globalData.userInfo.uid,
                'requestId':that.data.detailTask.requestId
            },
            header: {
                'Authorization': app.globalData.userInfo.uid,
            },
            success(e) {
                console.log(e);
            }
        })
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
