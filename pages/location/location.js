
Page({
  data:{
    latitude: '',
    longitude: '',
    markers: [{
      latitude: 0,
      longitude: 0,
      name: '我的位置',  
      desc: ''
    }],
    covers: [{
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
    }, {
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
      rotate: 180
    }],
    formatted_address: '',
    loading: false
  },
  onLoad:function(options){
    this.getLocation();
  },
  getLocation: function() {
    var that = this
    that.setData({
      loading: true
    })
    wx.getLocation({
      type: 'gcj02',
      success: function(res){
        // 设置地图
        that.setData({
          latitude: res.latitude,
          longitude: parseFloat(res.longitude+ '1'),
          markers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }],
          covers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }, {
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }],
          loading : false
        })

      }
    })
  },
  refreshLocation: function(){
    this.getLocation()
  }
})