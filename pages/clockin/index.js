//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    dialogShow: false,
    oneButton: [{ text: "确定" }],
    errShow: false,
    errText: ''
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
    });
  },
  tapWakeUpButton(e) {
    const hour = new Date().getHours()
    if (hour > 12) {
      this.setData({
        errShow: true,
        errText: '打卡不在时间统计范围内'
      })
    }
    const userId = wx.getStorageSync('userId')
    // 发起请求
    wx.request({
      url: `${this.globalData.host}/postTime`,
      data: {
        userId,
        dateTime,
        wakeUpTime,
        bedTime
      },
      success (res) {
        console.log(res.data)
      }
    })
    // this.setData({
    //   showOneButtonDialog: true,
    // });
  },
  tapBedButton(e) {
    const hour = new Date().getHours()
    if (hour < 20) {
      this.setData({
        errShow: true,
        errText: '打卡不在时间统计范围内'
      })
    }
    // this.setData({
    //   showOneButtonDialog: true,
    // });
  },
  onLoad: function () {
    const userId = wx.getStorageSync('userId')

  },
});
