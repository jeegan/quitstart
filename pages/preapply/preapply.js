var util = require('../../utils/util')
var app = getApp()

Page({
  data: {
    name: '',
    nickName: '',
    gender: 0,
    genderArray: ['男', '女'],
    genderIndex: 0,
    age: '',
    tel: '',
    hasSumit :false,
  },
  onLoad: function (options) {
    var birthdayEndDate = util.getDate()
    var that = this
    wx.getStorage({
      key: 'person_info',
      success: function (res) {
        var data = res.data
        that.setData({
          name: data.name,
          gender: data.gender,
          genderIndex: data.genderIndex,
          age: data.age,
          tel: data.tel,
          hasSumit: data.hasSumit,
        })


      }
    })
  },

  changeGender: function (e) {
    console.log(e)
    var genderIndex = e.detail.value
    if (genderIndex != "null") {
      this.setData({
        genderIndex: genderIndex,
        gender: this.data.genderArray[this.data.genderIndex]
      })
    }
  },

  savePersonInfo: function (e) {
    var data = e.detail.value
    var that = this

    if (data.name == "") {
      wx.showToast({
        title: '您的宝宝叫什么名？',
      })
      return;
    }else if(data.age=="") {
      wx.showToast({
        title: '您的宝宝几岁了？',
      })
      return;
    }else if(data.gender==""){
      wx.showToast({
        title: '您的是男宝宝还是女宝宝？',
      })
      return;
    }else if(data.tel=="") {
      wx.showToast({
        title: '您的联系电话？',
      })
      return;
    }

    console.log(data);
    var hostUrl = app.globalData.hostName
    wx.request({
      url: app.globalData.hostHttp + '://' + hostUrl + '/wendier/picAction!preApplySubmit.action',
      data :{
        childName: data.name,
        childAge: data.age,
        childSex: data.genderIndex,
        mobileNum: data.tel,
      },
      success: function (res) {
        if (res.data.success) {
          that.setData({  hasSumit: true})

          wx.setStorage({
            key: 'person_info',
            data: {
              name: data.name,
              age: data.age,
              gender: data.gender,
              genderIndex: data.genderIndex,
              tel: data.tel,
              hasSumit: true,              
            },
            success: function (res) {
              wx.showToast({
                title: '预约体验提交成功',
                icon: 'success',
                duration: 2000
              })
              /** 
              setTimeout(function () {
                wx.navigateTo({
                  url: '../personInfo/personInfo'
                })
              }, 2000)  **/
            }
          })
        }

      }
    })


  },


})