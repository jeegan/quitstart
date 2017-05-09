Page({
  data: {
    markers: [{
      iconPath: "/images/location.png",
      id: 0,
      latitude: 22.56700,
      longitude: 113.85910,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.85920,
        latitude: 22.56710
      }, {
        longitude: 113.85910,
        latitude: 22.56700
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/images/uv.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    wx.showToast({
      title:'宝和苑二楼',
      image:'/images/uv.png',
      mask:true,
      duration:1000
      })
  },
  controltap(e) {
    console.log(e.controlId)
    wx.showToast({
      title:'温迪儿欢迎您',
      image:'/images/uv.png',
      mask:true,
      duration:1000
      })
  },

  getLocation(e) {
    wx.chooseLocation({
      success: function(res){
        console.log('....sucess')
      },
      fail: function(res) {
        console.log('....fail')
      },
      complete: function(res) {
        console.log('....complete' + res.name + ',' + res.address + ',' + res.latitude + ',' + res.longitude)
      }
    })    
  },

  openLocation(e)  {
    wx.openLocation({
      latitude: 22.56700, // 纬度，范围为-90~90，负数表示南纬
      longitude: 113.85910, // 经度，范围为-180~180，负数表示西经
      scale: 28, // 缩放比例
      // name: 'name', // 位置名
      // address: 'address', // 地址的详细说明
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }




})