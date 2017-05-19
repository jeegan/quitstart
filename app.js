//app.js
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow : function(options) {
    console.log(options.path)
    console.log(options.scene)
  },  
  onHide: function() {
      // Do something when hide.
  },
  onError: function(msg) {
    console.log(msg)
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (lres) {
          var tmpMobileNum = ''

          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              that.globalData.userInfo.mobNum = tmpMobileNum
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })

        }
      })
    }
  },
  globalData:{
    userInfo:null ,
    hostHttp : 'https',
    hostName: '55896984.qcloud.la',
    //hostHttp: 'http',
    //hostName: 'weixin.jucheng.com',

    //打开相册时显示的标题及请求的url-action
    itemTitle : '' ,
    itemAction : '',
  }
})