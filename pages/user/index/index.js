// pages/user/index.js
Page({
  data: {
    processingCount: 0,
    overdueCount: 0,
    finishedCount: 0,
    name: "珞珈山的樱花"
  },
  onLoad: function (options) {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    that.setData({
      processingCount: 5,
      overdueCount: 6,
      finishedCount: 3
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