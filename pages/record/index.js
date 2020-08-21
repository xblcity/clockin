import * as echarts from "../../ec-canvas/echarts";
import moment from "../../utils/moment.min.js";
import { translateTimeToNumber } from "../../utils/util";

const app = getApp();

const typeMap = {
  week: "本周统计",
  month: "本月统计",
};

function setOption(chart, type, data) {
  let dayTotal;
  if (type === "week") {
    dayTotal = 7;
  }
  if (type === "month") {
    dayTotal = parseInt(moment().endOf("month").format("DD"));
  }
  const source = [...new Array(dayTotal)]
    .map((item, index) =>
      type === "week"
        ? moment().startOf("isoWeek").add(index, "days").format("YYYY-MM-DD")
        : moment().startOf("month").add(index, "days").format("YYYY-MM-DD")
    )
    .map((date) => {
      const target = data.find((item) => item.dateTime === date);
      const newDate = moment(date).format("MM/DD");
      if (target) {
        const { sleepTime, wakeUpTime, bedTime } = target;
        // 时间进制转换成 数字.
        return [
          newDate,
          translateTimeToNumber(wakeUpTime),
          translateTimeToNumber(bedTime),
          Number(sleepTime),
          wakeUpTime,
          bedTime,
        ];
      }
      return [newDate, "", "", "", "", "", ""];
    });
  const options = {
    // 标题
    title: {
      text: typeMap[type],
      textStyle: {
        color: "#333",
        fontWeight: "normal",
        fontSize: "16px",
      },
      padding: [10, 0, 0, 0],
      left: "center",
    },
    // 提示框
    tooltip: {
      formatter: function (params) {
        const { value } = params;
        // 时间转换
        const wakeUpTime = value[4];
        const bedTime = value[5];
        const sleepTime = value[3] ? `${value[3]}小时` : "";
        return `  统计日期：${value[0]}
  起床时间：${wakeUpTime}
  睡觉时间：${bedTime}
  睡眠时长：${sleepTime}`;
      },
    },
    xAxis: {
      type: "category",
    },
    // 数组形式,左右连个纵坐标，同时series也要有多个
    yAxis: [
      {
        type: "value",
        name: "时间点",
      },
      {
        type: "value",
        name: "时长/h",
      },
    ],
    dataset: {
      // source: [
      //   ["7/12", "6.12", "20.12", 7],
      //   ["7/13", "7.12", "20.12", 5],
      //   ["7/14", "7.12", "22.12"],
      //   ["7/15", "7.12", "", 6],
      //   ["7/16", "7.12", "19.12", 4],
      //   ["7/17", "7.12", "20.12", 10],
      //   ["7/18", "7.12", "21.12", 9],
      // ],
      source,
    },
    // 单个或者多个组合
    series: [
      {
        type: "bar",
        encode: {
          x: 0,
          y: 3,
        },
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: "#2F80ED",
          },
        },
        emphasis: {
          itemStyle: {
            // 高亮时点的颜色。
            color: "#06A8F5",
          },
          // label: {
          //   show: true,
          //   // 高亮时标签的文字。
          //   // formatter: "This is a emphasis label.",
          // },
        },
      },
      {
        type: "line",
        encode: {
          x: 0,
          y: 1,
        },
        itemStyle: {
          normal: {
            color: "#00b09b",
          },
        },
        yAxisIndex: 0,
      },
      {
        type: "line",
        encode: {
          x: 0,
          y: 2,
        },
        itemStyle: {
          normal: {
            color: "#C06C84",
          },
        },
        yAxisIndex: 0,
      },
    ],
  };
  chart.setOption(options);
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: "ECharts 我的打卡记录",
      path: "/pages/clockin/index",
      success: function () {},
      fail: function () {},
    };
  },

  data: {
    hasLoad: false,
    ecWeek: {
      lazyLoad: true,
    },
    ecMonth: {
      lazyLoad: true,
    },
    weekSleepTime: "",
    weekWakeUpTime: "",
    weekBedTime: "",
    monthSleepTime: "",
    monthWakeUpTime: "",
    monthBedTime: "",
    totalAverageSleepTime: "",
    totalAverageWakeUpTime: "",
    totalAverageBedTime: "",
  },

  handleRequest() {
    const userId = wx.getStorageSync("userId");
    const that = this;
    wx.request({
      url: `${app.globalData.host}/postDayList`,
      method: "post",
      data: {
        userId,
      },
      success(res) {
        if (!res.data.status) {
          wx.showToast({
            title: res.data.errMsg || "请求失败",
            icon: "none",
            duration: 2000,
          });
          return;
        }
        console.log(res.data);
        const {
          weekDaysList,
          monthDaysList,
          weekSleepTime,
          weekWakeUpTime,
          weekBedTime,
          monthSleepTime,
          monthWakeUpTime,
          monthBedTime,
          totalAverageSleepTime,
          totalAverageWakeUpTime,
          totalAverageBedTime,
        } = res.data.data;
        that.setData({
          weekSleepTime: weekSleepTime || "暂无数据",
          weekWakeUpTime: weekWakeUpTime || "暂无数据",
          weekBedTime: weekBedTime || "暂无数据",
          monthSleepTime: monthSleepTime || "暂无数据",
          monthWakeUpTime: monthWakeUpTime || "暂无数据",
          monthBedTime: monthBedTime || "暂无数据",
          totalAverageSleepTime: totalAverageSleepTime || "暂无数据",
          totalAverageWakeUpTime: totalAverageWakeUpTime || "暂无数据",
          totalAverageBedTime: totalAverageBedTime || "暂无数据",
        });
        // setState
        that.ecWeekComponent.init((canvas, width, height, dpr) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr, // new
          });

          setOption(chart, "week", weekDaysList);

          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          // this.chart = chart;

          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return chart;
        });

        that.ecMonthComponent.init((canvas, width, height, dpr) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr, // new
          });
          setOption(chart, "month", monthDaysList);
          return chart;
        });
      },
      fail(err) {
        wx.showToast({
          title: err.errMsg || "请求失败",
          icon: "none",
          duration: 2000,
        });
        return;
      },
    });
  },

  onReady() {
    // 获取组件
    this.ecWeekComponent = this.selectComponent("#mychart-week-line");
    this.ecMonthComponent = this.selectComponent("#mychart-month-line");
    this.handleRequest();
    this.setData({
      hasLoad: false,
    });
  },

  onLoad() {
    this.setData({
      hasLoad: true,
    });
  },

  onShow() {
    // 非第一次 会触发请求
    if (!this.data.hasLoad) {
      this.handleRequest();
    }
    // const userId = wx.getStorageSync("userId");
    // 用户不存在或者未登录，跳转至mine
    // if (!userId) {
    //   wx.switchTab({
    //     url: "../mine/index",
    //   });
    // }
  },
});
