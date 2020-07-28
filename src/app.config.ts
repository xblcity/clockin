export default {
  pages: ["pages/clockin/index", "pages/record/index", "pages/mine/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "小小鹿打卡",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        pagePath: "pages/clockin/index",
        text: "打卡",
        iconPath: './public/clockin.png',
        selectedIconPath: './public/clockinActive.png',
      },
      {
        pagePath: "pages/record/index",
        text: "统计",
        iconPath: './public/record.png',
        selectedIconPath: './public/recordActive.png',
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        iconPath: './public/mine.png',
        selectedIconPath: './public/mineActive.png',
      },
    ],
  },
};
