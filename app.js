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
          /**把登陆code发往服务器后台https解析获得用户的openid 和 session_key 
          if (lres.code) {
              //发起网络请求
              wx.request({
                url: 'http://weixin.jucheng.com/sas/weiXin/wxmp!getOpenIdInfo.action',
                data: {
                  code: lres.code
                },
                success: function(res){
                  tmpMobileNum = res.data.loginMobNum
                }
              })
           } else {
              console.log('获取用户登录态失败！' + res.errMsg)
           } 
           */


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
    userInfo:null
  }
})