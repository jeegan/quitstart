// pages/center/center.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    baseUrl: app.globalData.hostHttp + '://' + app.globalData.hostName + '/wendier/', 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })


  },

  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    if ( data.url =='favorite') {
      wx.showToast({
        title: '在建中...',
      })
    }else{
      if (data.url =='gallery')  {
        app.globalData.keyTitle = data.title
        app.globalData.keyAction = data.action
      }


      wx.navigateTo({
        url: "../" + data.url + '/' + data.url + '?item =' + data.item
      })
    }
  },

  


})