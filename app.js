//app.js
App({
  onLaunch: function () {
    // 小程序启动
    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${this.globalData.host}/wxLogin`,
          method: 'post',
          data: {
            code: res.code,
          },
          success(res) {
            if (!res.data.status) {
              wx.showToast({
                title: res.data.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
            const { userId } = res.data.data;
            // 存储用户id
            wx.setStorageSync("userId", userId);
          },
          fail(err) { 
            wx.showToast({
              title: err.errMsg,
              icon: 'none',
              duration: 2000
            })
          }
        });
      },
    });
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            },
          });
        }
      },
    });
  },
  globalData: {
    userInfo: null,
    host: "https://clockin.xblcity.com",
  },
});
