import { postUserRegister } from "../../service/login"

Page({
  data: {
    username: "",
    password: ""
  },

  onLoad(options) {

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

  onRegisterClick() {
    this.fecthUserRegister()
  },

  // 网络请求方法
  async fecthUserRegister() {
    const username = this.data.username
    const password = this.data.password
    const res = await postUserRegister(username, password)
    // console.log(res);
    if (res.code === -1001) {
      wx.showToast({
        title: res.message,
        duration: 1000,
        icon: "none"
      })
    }else if(res.code === -1002) {
      wx.showToast({
        title: res.message,
        duration: 1000,
        icon: "none"
      })
    }if (res.code === 0) {
      wx.showToast({
        title: res.message,
        duration: 1000,
        icon: "none"
      })
      const isRegister = true
      wx.navigateTo({
        url: `/pages/system-login/system-login?isRegister=${isRegister}`,
      })
    }
  }
})