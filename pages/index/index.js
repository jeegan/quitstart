//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    baseUrl: app.globalData.hostHttp + '://' + app.globalData.hostName + '/wendier/', 

  },
  //事件处理函数
  


  viewLocation:function() {
    wx.navigateTo({
      url: '../map/map' 
    })
  },

  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

  } ,

  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset
    if (data.url == 'gallery') {
      app.globalData.keyTitle = data.title
      app.globalData.keyAction = data.action
    }


    wx.navigateTo({
      url: "../" + data.url + '/' + data.url + '?item =' + data.item
    })
  },

  viewPreApply:function (e) {
    wx.navigateTo({
      url: "../preapply/preapply"
    })
  },


})
