export default {
  pages: ["pages/clockin/index", "pages/record/index", "pages/mine/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/clockin/index",
        text: "打卡",
        iconPath: './public/clockin.png',
        selectedIconPath: './public/clockin.png',
      },
      {
        pagePath: "pages/record/index",
        text: "统计",
        iconPath: './public/record.png',
        selectedIconPath: './public/record.png',
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: './public/mine.png',
        selectedIconPath: './public/mine.png',
      },
    ],
  },
};
