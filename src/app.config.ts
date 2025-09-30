export default defineAppConfig({
  pages: [
    'pages/checkin/checkin',
    'pages/help/help',
    'pages/profile/profile',
    'pages/profile/contact',
    'pages/profile/recharge',
    'pages/profile/refund',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '报平安',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#667eea',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/checkin/checkin',
        text: '打卡'
      },
      {
        pagePath: 'pages/help/help',
        text: '求助'
      },
      {
        pagePath: 'pages/profile/profile',
        text: '我的'
      }
    ]
  }
})
