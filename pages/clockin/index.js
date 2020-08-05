//index.js
//获取应用实例
const app = getApp();
import moment from '../../utils/moment.min.js'

Page({
  data: {
    successShow: false,
    sucessText: "",
    buttonText: [{ text: "确定" }],
    errShow: false,
    errText: "",
    userId: "",
  },
  // 隐藏dialog
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
    });
  },
  // 点击起床打卡
  tapWakeUpButton(e) {
    const hour = new Date().getHours();
    if (hour > 12) {
      this.setData({
        errShow: true,
        errText: "打卡不在时间0~12点范围内",
      });
      return;
    }
    const userId = wx.getStorageSync("userId");
    // 发起请求
    console.log(moment())
    const that = this;
    wx.request({
      url: `${app.globalData.host}/postTime`,
      data: {
        userId,
        dateTime,
        bedTime,
      },
      success(res) {
        if (res.statusCode !== 200) {
          that.setData({
            errShow: true,
            errText: res.data.errMsg,
          });
          return
        }
        that.setData({
          successShow: true,
          sucessText: res.data.successMsg,
        });
      },
      fail() {
        that.setData({
          errShow: true,
          errText: "请求出错",
        });
      },
    });
  },
  tapBedButton(e) {
    const hour = new Date().getHours();
    if (hour < 20) {
      this.setData({
        errShow: true,
        errText: "打卡不在时间8~12点范围内",
      });
      return;
    }
    const that = this;
    const dateTime = moment().format('YYYY-MM-DD')
    const bedTime = moment().format('HH:mm:ss')
    wx.request({
      url: `${app.globalData.host}/postTime`,
      data: {
        // userId,
        dateTime,
        bedTime,
      },
      success(res) {
        if (res.statusCode !== 200) {
          that.setData({
            errShow: true,
            errText: res.data.errMsg,
          });
          return
        }
        that.setData({
          successShow: true,
          sucessText: res.data.successMsg,
        });
      },
      fail() {
        that.setData({
          errShow: true,
          errText: "请求出错",
        });
      },
    });
  },
  onLoad: function () {
    const userId = wx.getStorageSync("userId");
    this.setData({
      userId,
    });
  },
});
