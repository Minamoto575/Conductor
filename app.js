//app.js
App({
    onLaunch: function () {
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                let CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                this.globalData.CustomBar = CustomBar;
                //适配全面屏底部距离
                if (CustomBar > 75) {
                    this.globalData.tabbar_bottom = "y"
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        url:'http://localhost:8433'
        // url:'http://47.106.170.165:8433'
    }
});

