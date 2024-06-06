// pages/system-login/system-login.js
import { postUserLogin } from "../../service/login"

Page({
  data: {
    username: "",
    password: "",
    sysInfo: {},
  },

  onLoad(options) {
    const isRegister = options.isRegister
    if (isRegister) {
      wx.showToast({
        title: '注册成功，请登录`s',
        duration: 1500,
        icon: "none"
      })
    }
  },

//  事件监听
  onUsernameInput(event) {
    this.setData({
      username: event.detail.value
    });
  },

  onPasswordInput(event) {
    this.setData({
      password: event.detail.value
    });
  },

  onLogin() {
    this.fecthUserLogin()
  },

  onRegisterTap() {
    wx.navigateTo({
      url: '/pages/system-register/system-register',
    })
  },
  // 网络请求方法
  async fecthUserLogin() {
    const username = this.data.username
    const password = this.data.password
    const res = await postUserLogin(username, password)
    // console.log(res);
    if (res.code === -1001) {
      wx.showToast({
        title: res.message,
        duration: 1000,
        icon: "none"
      })
    }else if(res.code === -1003) {
      wx.showToast({
        title: res.message,
        duration: 1000,
        icon: "none"
      })
    }else if(res.code === -1004) {
      wx.showToast({
        title: res.message,
        duration: 1000,
        icon: "none"
      })
    }else if(res.code === -1007) {
      wx.showToast({
        title: res.message,
        duration: 1000,
        icon: "none"
      })
    }if (res.code === 0) {
      this.setData({ sysInfo: res.data })
      wx.navigateTo({
        url: `/pages/sys-detail/sys-detail?user_id=${res.data.id}&user_name=${res.data.user_name}&user_avatar=${res.data.user_avatar}`,
      })
    }
   
  }
})