// pages/user/index.js
const app = getApp();
Page({
  data: {
    processingCount: 0,
    overdueCount: 0,
    finishedCount: 0,
    name: "珞珈山的樱花",
    //三种任务类型
    processing: [],
    overdue: [],
    finished: []
  },
  onLoad: function (options) {
    let that = this;
    // wx.showLoading({
    //   title: '数据加载中',
    //   mask: true,
    // })

    //获取正在进行任务列表
    wx.request({
      url: 'http://api.fuchuang2.nowcent.cn/task?uid=' + app.globalData.userInfo.uid + '&&status=1',
      //url: 'http://localhost:8433/task?uid=' + app.globalData.userInfo.uid + '&&status=1',
      header: {
        'Authorization': app.globalData.userInfo.uid
      },
      success(e) {
        //console.log(e);
        that.setData({
          processing: e.data.data,
          processingCount: e.data.data.length
        })
      }
    })
    //获取已完成任务列表
    wx.request({
      url: 'http://api.fuchuang2.nowcent.cn/task?uid=' + app.globalData.userInfo.uid + '&&status=2',
      //url: 'http://localhost:8433/task?uid=' + app.globalData.userInfo.uid + '&&status=2',
      header: {
        'Authorization': app.globalData.userInfo.uid
      },
      success(e) {
        //console.log(e);
        that.setData({
          finished: e.data.data,
          finishedCount:e.data.data.length
        })
      }
    })

    //获取已超时任务列表
    wx.request({
      url: 'http://api.fuchuang2.nowcent.cn/task?uid=' + app.globalData.userInfo.uid + '&&status=3',
      //url: 'http://localhost:8433/task?uid=' + app.globalData.userInfo.uid + '&&status=3',
      header: {
        'Authorization': app.globalData.userInfo.uid
      },
      success(e) {
        //console.log(e);
        that.setData({
          overdue: e.data.data,
          overdueCount: e.data.data.length
        })
      }
    })
    // numDH();
    // function numDH() {
    //   if (i < 20) {
    //     setTimeout(function() {
    //       that.setData({
    //         processingCount: i,
    //         overdueCount: i,
    //         finishedCount: i
    //       })
    //       i++
    //       numDH();
    //     }, 20)
    //   } else {
    //     that.setData({
    //       processingCount: that.coutNum(999),
    //       overdueCount: that.coutNum(8888),
    //       finishedCount: that.coutNum(77777)
    //     })
    //   }
    // }
    wx.hideLoading()
  },
  myTaskClicked:function(e){
    var that = this;
    var processing = JSON.stringify(that.data.processing);
    var finished = JSON.stringify(that.data.finished);
    var overdue = JSON.stringify(that.data.overdue);

    wx.navigateTo({
      url: '/pages/user/mytask/index?processing='+processing+'&finished='+finished+'&overdue='+overdue,
    })
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