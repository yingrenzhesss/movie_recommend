// pages/sys-detail/sys-detail.js
Page({
  data: {

  },

  onLoad(options) {
    const user_name = options.user_name
    const user_avatar = options.user_avatar
    const user_id = options.user_id
    wx.setStorageSync('user_id', user_id)
    wx.setStorageSync('user_name', user_name)
    wx.setStorageSync('user_avatar', user_avatar)
    wx.showToast({
      title: '欢迎登录管理员后台',
      duration: 2000,
      icon: "none"
    })
  },

})