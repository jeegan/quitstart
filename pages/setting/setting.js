var app = getApp()
Page({
  data:{
    cells: [
      
      [
        { title: '手机信息', text: '', access: true, fn: 'viewSystemInfo' },
        { title: '清除缓存', text: '', access: false, fn: 'clearStorage' }
      ],
     

      [{title: '更新位置', text: '', access: true, fn: 'viewLocation'}],
      [{title: '关于', text: '', access: true, fn: 'viewAbout'}],

      [{ title: '发起支付', text: '', access: true, fn: 'viewPay' }]

    ]
  },

  onLoad:function(options){},


  viewSystemInfo: function () {
    wx.redirectTo({
      url: "../systemInfo/systemInfo"
    })
  },
  viewLocation: function () {
    wx.redirectTo({
      url: "../location/location"
    })
  },
  clearStorage: function () {
    wx.showModal({
      title: '确认要清除',
      content: '清除缓存会删除浏览历史和收藏及个人资料',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorage()
          //app.initStorage()
          wx.showToast({
            title: '清除成功',
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },


  viewAbout: function() {
		wx.redirectTo({
			url: "../about/about"
		})
  },

  viewPay : function()  {
    var that = this


    //发起支付  
    var prepay_id = that.getXMLNodeValue('prepay_id', res.data.toString("utf-8"))
    var tmp = prepay_id.split('[')
    var tmp1 = tmp[2].split(']')
    //签名    
    var key = '';
    var appId = '';
    var timeStamp = that.createTimeStamp();
    var nonceStr = that.randomString();
    var stringSignTemp = "appId=&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" + timeStamp + "&key="
    var sign = MD5.MD5(stringSignTemp).toUpperCase()
    console.log(sign)
    var param = { "timeStamp": timeStamp, "package": 'prepay_id=' + tmp1[0], "paySign": sign, "signType": "MD5", "nonceStr": nonceStr }



    //统一支付  
    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      method: 'POST',
      head: 'application/x-www-form-urlencoded',
      data: formData, // 设置请求的 header  
      success: function (res) {
        console.log(res.data)

        var result_code = that.getXMLNodeValue('result_code', res.data.toString("utf-8"))
        var resultCode = result_code.split('[')[2].split(']')[0]
        if (resultCode == 'FAIL') {
          var err_code_des = that.getXMLNodeValue('err_code_des', res.data.toString("utf-8"))
          var errDes = err_code_des.split('[')[2].split(']')[0]
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面  
            success: function (res) {
              wx.showToast({
                title: errDes,
                icon: 'success',
                duration: 2000
              })
            },

          })
        } else {
          //发起支付  
          var prepay_id = that.getXMLNodeValue('prepay_id', res.data.toString("utf-8"))
          var tmp = prepay_id.split('[')
          var tmp1 = tmp[2].split(']')
          //签名    
          var key = '';
          var appId = '';
          var timeStamp = that.createTimeStamp();
          var nonceStr = that.randomString();
          var stringSignTemp = "appId=&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" + timeStamp + "&key="
          var sign = MD5.MD5(stringSignTemp).toUpperCase()
          console.log(sign)
          var param = { "timeStamp": timeStamp, "package": 'prepay_id=' + tmp1[0], "paySign": sign, "signType": "MD5", "nonceStr": nonceStr }
          that.toPay(param)
        }



      },

    })





  },


  toPay: function (param) {

      wx.requestPayment({
        timeStamp: param.timeStamp,
        nonceStr: param.nonceStr,
        package: param.package,
        signType: param.signType,
        paySign: param.paySign,
        success: function (res) {
          // success  
          console.log(res)
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面  
            success: function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function () {
              // fail  
            },
            complete: function () {
              // complete  
            }
          })
        },
        fail: function () {
          // fail  
          console.log("支付失败")
        },
        complete: function () {
          // complete  
          console.log("pay complete")
        }
      })

  }  ,

  /* 获取prepay_id */
  getXMLNodeValue: function (node_name, xml) {
    var tmp = xml.split("<" + node_name + ">")
    var _tmp = tmp[1].split("</" + node_name + ">")
    return _tmp[0]
  },  





})