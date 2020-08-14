import * as echarts from "../../ec-canvas/echarts";

const app = getApp();

const typeMap = {
  week: "本周统计",
  month: "本月统计",
};
function setOption(chart, type, data) {
  let type = "week";
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
        ? moment().startOf("week").add(index, "days").format("YYYY-MM-DD")
        : moment().startOf("month").add(index, "days").format("YYYY-MM-DD")
    )
    .map((date) => {
      const target = data.find((item) => item.dateTime === date);
      if (target) {
        const { dateTime, sleepTime, wakeUpTime, bedTime } = target;
        return [dateTime, sleepTime, wakeUpTime, bedTime];
      }
      return [date, "", "", "", ""];
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
        const wakeUpTime = value[1] && value[1].split();
        const bedTime = value[2] && value[2].replace(".", ":");
        return `  起床时间：${wakeUpTime}
  睡觉时间：${bedTime}
  睡眠时长：${value[3] ? value[3] : ""}`;
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

  onReady() {
    // 获取组件
    this.ecWeekComponent = this.selectComponent("#mychart-week-bar");
    this.ecMonthComponent = this.selectComponent("#mychart-month-bar");
  },

  data: {
    ecWeek: {
      lazyLoad: true,
    },
    ecMonth: {
      lazyLoad: true,
    },
    ecMonth: {
      onInit: initMonthChart,
    },
  },

  onload() {
    const userId = wx.getStorageSync("userId");
    // 用户不存在或者未登录，跳转至mine
    // if (!userId) {
    //   wx.switchTab({
    //     url: "../mine/index",
    //   });
    // }

    wx.request({
      url: `${app.globalData.host}/postDayList`,
      success(res) {
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
        } = res.data;
        const rData = [
          {
            id: 7,
            dateTime: "2020-08-10",
            sleepTime: "8.48",
            wakeUpTime: "05:12:19",
            bedTime: "22:15:19",
          },
          {
            id: 8,
            dateTime: "2020-08-11",
            sleepTime: "8.28",
            wakeUpTime: "06:45:12",
            bedTime: "23:05:55",
          },
          {
            id: 9,
            dateTime: "2020-08-12",
            sleepTime: "",
            wakeUpTime: "07:23:12",
            bedTime: "22:45:12",
          },
        ];
        // 处理数据
        // setState
        this.ecWeekComponent.init((canvas, width, height, dpr) => {
          // 获取组件的 canvas、width、height 后的回调函数
          // 在这里初始化图表
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr, // new
          });

          setOption(chart, 'week', rData);

          // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
          // this.chart = chart;

          // 注意这里一定要返回 chart 实例，否则会影响事件处理等
          return chart;
        });

        this.ecMonthComponent.init((canvas, width, height, dpr) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr, // new
          });
          setOption(chart, 'month', rData);
          return chart;
        });
      },
      fail() {
        
      }
    });
  },
});
