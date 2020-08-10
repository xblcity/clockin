import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    // 标题
    title: {
      text: "本周统计",
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
        return `起床时间：${wakeUpTime}<br/>
        睡觉时间：${bedTime}<br/>
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
      source: [
        ["7/12", "6.12", "20.12", 7],
        ["7/13", "7.12", "20.12", 5],
        ["7/14", "7.12", "22.12"],
        ["7/15", "7.12", "", 6],
        ["7/16", "7.12", "19.12", 4],
        ["7/17", "7.12", "20.12", 10],
        ["7/18", "7.12", "21.12", 9],
      ],
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

  chart.setOption(option);
  return chart;
}

function initMonthChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    // 标题
    title: {
      text: "本月统计",
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
        return `起床时间：${wakeUpTime}<br/>
        睡觉时间：${bedTime}<br/>
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
      source: [
        ["7/5", "6.12", "20.12", 7],
        ["7/6", "7.12", "20.12", 5],
        ["7/7", "7.12", "22.12"],
        ["7/8", "7.12", "", 6],
        ["7/9", "7.12", "19.12", 4],
        ["7/10", "7.12", "20.12", 10],
        ["7/11", "7.12", "21.12", 9],
        ["7/12", "6.12", "20.12", 7],
        ["7/13", "7.12", "20.12", 5],
        ["7/14", "7.12", "22.12"],
        ["7/15", "7.12", "", 6],
        ["7/16", "7.12", "19.12", 4],
        ["7/17", "7.12", "20.12", 10],
        ["7/18", "7.12", "21.12", 9],
        ["7/19", "7.12", "21.12", 9],
        ["7/20", "7.12", "21.12", 9],
        ["7/21", "7.12", "21.12", 9],
        ["7/22", "7.12", "21.12", 9],
        ["7/23", "7.12", "21.12", 9],
        ["7/24", "7.12", "21.12", 9],
        ["7/25", "7.12", "21.12", 9],
        ["7/26", "7.12", "21.12", 9],
        ["7/27", "7.12", "21.12", 9],
        ["7/28", "7.12", "21.12", 9],
        ["7/29", "7.12", "21.12", 9],
        ["7/30", "7.12", "21.12", 9],
        ["7/31", "7.12", "21.12", 9],
      ],
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

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 我的打卡记录',
      path: '/pages/clockin/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ecWeek: {
      onInit: initChart
    },
    ecMonth: {
      onInit: initMonthChart
    }
  },

  onReady() {
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
          dayList,
          averageSleepTime,
          averageWakeUpTime,
          averageBedTime,
        } = res.data;
        // 处理数据
        // setState
      },
    });
  }
});
