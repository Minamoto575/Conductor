const app = getApp();
const utils = require("../../utils/util.js");
Page({
    data: {
        StatusBar: app.globalData.StatusBar + 6,
        TabbarBot: app.globalData.tabbar_bottom,
        uid: -1,
        // 'https://image.weilanwl.com/img/4x3-1.jpg',
        // 'https://image.weilanwl.com/img/4x3-2.jpg',
        // 'https://image.weilanwl.com/img/4x3-3.jpg',
        // 'https://image.weilanwl.com/img/4x3-4.jpg',
        swiperlist: [],
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
            url: app.globalData.url + '/user/accept',
            method: "POST",
            data: {
                'uid': app.globalData.userInfo.uid,
                'requestId': that.data.detailTask.requestId
            },
            header: {
                'JSESSIONID': app.globalData.userInfo.sessionId,
            },
            success(e) {
                wx.showToast({
                    title: '接受成功！', // 标题
                    icon: 'success', // 图标类型，默认success
                    duration: 1500, // 提示窗停留时间，默认1500ms
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack()
                        }, 1600) //延迟时间 这里是2秒
                    }
                })
            }
        })
    },

    //完成任务
    finnish: function (e) {
        var that = this;
        wx.request({
            url: app.globalData.url + '/user/complete',
            method: "POST",
            data: {
                'uid': app.globalData.userInfo.uid,
                'requestId': that.data.detailTask.requestId
            },
            header: {
                'JSESSIONID': app.globalData.userInfo.sessionId,
            },
            success(e) {
                wx.showToast({
                    title: '完成任务！', // 标题
                    icon: 'success', // 图标类型，默认success
                    duration: 1500, // 提示窗停留时间，默认1500ms
                    success: function () {
                        setTimeout(function () {
                            wx.navigateBack()
                        }, 1600) //延迟时间 这里是2秒
                    }
                })
            }
        })
    },

    //初始化时获取上个页面跳转时传过来的参数
    //然后根据此参数去请求具体信息
    onLoad: function (options) {
        var that = this;
        console.log(options.requestId);
        wx.request({
            url: app.globalData.url + '/task/' + options.requestId,
            header: {
                'JSESSIONID': app.globalData.userInfo.sessionId,
            },
            success(res) {
                console.log(res)
                that.setData({
                    detailTask: res.data.data,
                    swiperlist: [res.data.data.photo],
                    uid:app.globalData.userInfo.uid
                })
                //将经纬度转化为具体位置放在location属性中
                that.getLocation();
            }
        })

    }

});
