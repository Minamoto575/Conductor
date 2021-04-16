const app = getApp();
const utils = require("../../../utils/util.js")
var date = new Date();
var curYear = date.getFullYear();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hidden: true,
    region: ['湖北省', '武汉市', '洪山区'],
    genders: ['女', '男'],
    gender: -1,
    pickerHidden: true,
    chosen: '',
    lostBirth: '',
    age: -1,
    //走失者位置
    longitude: 0,
    latitude: 0,
    //选点后的具体位置
    location: '',
    photos: [],
    names: [],
    photoUrl: ''
  },
  onLoad: function (option) {
    //console.log(option.id);
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/auth/auth'
          })
        }
      }
    });
  },

  //地址选择
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },

  pickerConfirm(e) {
    this.setData({
      pickerHidden: true
    })
    this.setData({
      chosen: e.detail.value
    })
  },

  pickerCancel() {
    this.setData({
      pickerHidden: true
    })
  },

  pickerShow() {
    this.setData({
      pickerHidden: false
    })
  },

  //提交事件
  formSubmit(e) {
    var that = this;
    var submit = e;
    //先处理照片
    wx.uploadFile({
      filePath: that.data.photos[0],
      name: 'file',
      //url: 'http://localhost:8433/image/upload',
      url: 'https://api.fuchuang2.nowcent.cn/image/upload',
      header: {
        'content-type': "multipart/form-data"
      },

      success(e) {
        console.log(e)
        console.log(e.data);
        var data = JSON.parse(e.data);
        //图片在后端的url
        that.setData({
          photoUrl: data.data.url
        })

        //报案上传到数据库
        var taskPostDTO = {
          'detail': submit.detail.value.detail,
          'latitude': parseFloat(submit.detail.value.latitude),
          'longitude': parseFloat(submit.detail.value.longitude),
          'lostAddress': submit.detail.value.lostAddress,
          'lostBirth': submit.detail.value.lostBirth,
          'lostGender': that.data.genders[that.data.gender],
          'lostName': submit.detail.value.lostName,
          'lostPhone': submit.detail.value.lostPhone,
          'photo': that.data.photoUrl
        }
        console.log(taskPostDTO);
        //console.log(app.globalData.userInfo.uid);
        //上传报案信息
        wx.request({
          method: "POST",
          url: 'https://api.fuchuang2.nowcent.cn/task/submit',
          //url: 'http://localhost:8433/task/submit',
          data: taskPostDTO,
          header: {
            'Authorization': app.globalData.userInfo.uid,
          },
          success(res) {
            console.log(res);
            wx.showToast({
              title: '报案成功！', // 标题
              icon: 'success', // 图标类型，默认success
              duration: 1500, // 提示窗停留时间，默认1500ms
              success: function () {
                setTimeout(function () {
                  wx.navigateBack()
                 }, 1600) //延迟时间 这里是2秒
              }
            })
          },
        })

      }
    })


  },
  //重置
  formReset(e) {
    //console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
    this.setData({
      photos: ''
    })
    this.setData({
      gender: -1
    })
    this.setData({
      lostBirth: ''
    })
    this.setData({
      age: -1
    })
  },
  //读取图片
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log(res);
        _this.setData({
          photos: res.tempFilePaths,
        })
        //console.log(_this.data.photos);
      }
    })
  },
  chooseLocationTapped: function () {
    var that = this;
    //打开地图进行地图选点，此处选点是老人的失踪位置
    wx.chooseLocation({
      success: function (res) {
        console.log(res.address);
        //选点后将经纬度写到属性中，以便后续上传
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        //设置经纬度后，还需要将经纬度转化为具体位置
        that.displayChosenLocation();
      }
    })
  },
  displayChosenLocation: function () {
    var that = this;
    //根据detailTask中的经纬度，调用utils中的地址反解析函数，得到位置
    utils.getLocation(this.data.latitude, this.data.longitude)
      .then(location => {
        that.setData({
          location: location
        });
      });
  },
  //选择性别
  genderChange: function (e) {
    this.setData({
      gender: e.detail.value
    })
  },
  //选择年龄
  ageChange: function (e) {
    var bir = e.detail.value;
    var birYear = bir.substring(0, 4);
    this.setData({
      lostBirth: bir
    })
    this.setData({
      age: curYear - birYear
    })
  }
});
