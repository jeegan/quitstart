var app = getApp()
Page({
  data: {
    cells: [

    ]
  },

  onLoad: function (options) {
    var that = this
    var hostUrl = app.globalData.hostName
    
    wx.request({
      url: app.globalData.hostHttp + '://' + hostUrl + '/wendier/picAction!getNoticeList.action',
        success : function(res) {
          that.setData({
              cells : res.data
          })
        }
    })


   },

  viewAbount: function () {
    wx.redirectTo({
      url: "../about/about"
    })
  }
})