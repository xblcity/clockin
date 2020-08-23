//index.js
//获取应用实例
const app = getApp();
import moment from "../../utils/moment.min.js";

Page({
  data: {
    errShow: false,
    errText: "",
    userId: "",
    currentTime: "",
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
    if (hour > 9 || hour < 4) {
      this.setData({
        errShow: true,
        errText: "打卡不在时间4~10点范围内",
      });
      return;
    }
    // 发起请求
    const that = this;
    const dateTime = moment().format("YYYY-MM-DD");
    const wakeUpTime = moment().format("HH:mm:ss");
    wx.request({
      url: `${app.globalData.host}/postTime`,
      method: 'post',
      data: {
        userId: that.data.userId,
        dateTime,
        wakeUpTime,
      },
      success(res) {
        if (res.statusCode !== 200) {
          that.setData({
            errShow: true,
            errText: res.data.errMsg || '服务器错误',
          });
          return;
        }
        wx.showToast({
          title: res.data.successMsg,
          icon: 'success',
          duration: 2000
        })
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
        errText: "打卡不在晚上8~12点范围内",
      });
      return;
    }
    const that = this;
    const dateTime = moment().format("YYYY-MM-DD");
    const bedTime = moment().format("HH:mm:ss");
    wx.request({
      url: `${app.globalData.host}/postTime`,
      method: "post",
      data: {
        userId: that.data.userId,
        dateTime,
        bedTime,
      },
      success(res) {
        if (res.statusCode !== 200) {
          that.setData({
            errShow: true,
            errText: res.data.errMsg || '服务器错误',
          });
          return;
        }
        wx.showToast({
          title: res.data.successMsg,
          icon: 'success',
          duration: 2000
        })
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
    setInterval(() => {
      this.setData({
        currentTime: moment().format("HH:mm:ss"),
      });
    }, 1000);
  },
});
