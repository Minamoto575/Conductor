// pages/user/index.js
const app = getApp();
Page({
  data: {
    processingCount: 0,
    overdueCount: 0,
    finishedCount: 0,
    username: '',
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      username:app.globalData.userInfo.username
    });
    //获取正在进行任务列表
    wx.request({
      url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=1',
      header: {
        'JSESSIONID': app.globalData.userInfo.sessionId,
      },
      success(e) {
        //console.log(e);
        that.setData({
          processingCount: e.data.data.length
        })
      }
    })
    //获取已完成任务列表
    wx.request({
      url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=2',
      header: {
        'JSESSIONID': app.globalData.userInfo.sessionId,
      },
      success(e) {
        //console.log(e);
        that.setData({
          finishedCount: e.data.data.length
        })
      }
    })

    //获取已超时任务列表
    wx.request({
      url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=3',
      header: {
        'JSESSIONID': app.globalData.userInfo.sessionId,
      },
      success(e) {
        //console.log(e);
        that.setData({
          overdueCount: e.data.data.length
        })
      }
    })
  },

  //切换回主界面触发
  onShow: function () {
    let that = this;
    //获取正在进行任务列表
    wx.request({
      url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=1',
      header: {
        'JSESSIONID': app.globalData.userInfo.sessionId,
      },
      success(e) {
        //console.log(e);
        that.setData({
          processingCount: e.data.data.length
        })
      }
    })
    //获取已完成任务列表
    wx.request({
      url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=2',
      header: {
        'JSESSIONID': app.globalData.userInfo.sessionId,
      },
      success(e) {
        //console.log(e);
        that.setData({
          finishedCount: e.data.data.length
        })
      }
    })

    //获取已超时任务列表
    wx.request({
      url: app.globalData.url + '/task?uid=' + app.globalData.userInfo.uid + '&&status=3',
      header: {
        'JSESSIONID': app.globalData.userInfo.sessionId,
      },
      success(e) {
        //console.log(e);
        that.setData({
          overdueCount: e.data.data.length
        })
      }
    })
  },
  //查看我的任务
  myTaskClicked: function (e) {
    var that = this;
    if (app.globalData.userInfo.uid != -1) {
      wx.navigateTo({
        url: '/pages/user/mytask/index'
      })
    }
  },
  //查看我的信息
  myInfoClicked: function (e) {
    var that = this;
    if (app.globalData.userInfo.uid != -1) {
      wx.navigateTo({
        url: '/pages/user/information/index'
      })
    }
  },

  coutNum(e) {
    if (e > 1000 && e < 10000) {
      e = (e / 1000).toFixed(1) + 'k'
    }
    if (e > 10000) {
      e = (e / 10000).toFixed(1) + 'W'
    }
    return e
  },
  CopyLink(e) {

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showQrcode() {

  },

});