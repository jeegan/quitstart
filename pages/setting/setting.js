var util = require('../../utils/MD5.js') 
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

    ],

    baseUrl: app.globalData.hostHttp + '://' + app.globalData.hostName + '/wendier/', 
    appid: 'wx6101020539e63409',//appid    
    body: '聚成股份',//商户名  
    mch_id: '1250644901',//商户号  
    key : 'jucheng', 
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

    //统一支付  
    wx.request({
      url: that.data.baseUrl + 'payAction!getUnifiedorderReturns.action',
      method: 'POST',
      head: 'application/x-www-form-urlencoded', // 设置请求的 header  
      data: {
        appid : that.data.appid ,//appid    
        body : that.data.body ,//商户名  
        mch_id : that.data.mch_id,//商户号
        key : that.data.key,    
      }, 
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
              var timeStamp = that.createTimeStamp();
              var nonceStr = that.randomString();
              var stringSignTemp = "appId="+that.data.appid+"&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" ;
                stringSignTemp +=  timeStamp + "&key=" + that.data.key ;
              var sign = MD5.hexMD5(stringSignTemp).toUpperCase()
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

  /* 随机数 */
  randomString: function () {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < 32; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },  
  /* 时间戳产生函数   */
  createTimeStamp: function () {
    return parseInt(new Date().getTime() / 1000) + ''
  },  




})