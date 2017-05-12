// pages/login/login.js
var app = getApp()
Page({
  data:{
    userInfo: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })



    })


  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
  ,
  jumpToIndex: function(e) {

        //根据userid查询该用户的注册信息，若未注册转向注册
			wx.navigateTo({
				url: "../index/index"
			})


  }


})