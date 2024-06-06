// pages/main-profile/main-profile.js
import { getLoginCode } from "../../service/profile"
Page({
  data: {
    isLogin: false, //判断登录
    userInfo: {},//用户信息

    tabs: [
      { name: "我的收藏", type: "favor" },
      { name: "我的评价", type: "comment" },
      { name: "最近播放", type: "history" }
    ]
  },
  onLoad() {
    const token = wx.getStorageSync('token')
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({ isLogin: !!token })
    if (this.data.isLogin) {
      this.setData({ userInfo })
    }
  },

// 事件监听方法
// 获取登录code传给后端
  async onUserInfoTap() {
    const _this = this
    // 1.获取用户的头像和昵称
    if (!this.data.isLogin) {  //阻止重复点击登录
      await wx.getUserProfile({
        desc: '获取您的头像和昵称',
        fail: (res) => {
          wx.showToast({
            title: '登录失败',
            icon: "none",
            duration: 1500, 
            mask: true, 
          });
        },
        success: (res) => {
          const result = res
      // 2.获取token
          wx.login({
            success (res) {
              if (res.code) {
                const user_name = result.userInfo.nickName
                const user_avatar = result.userInfo.avatarUrl
                // console.log(res.code,user_name,user_avatar);
                //发起网络请求
                wx.request({
                  url: 'http://localhost:8000/logincode',
                  method: "POST",
                  data: {
                    code: res.code,
                    user_avatar: user_avatar,
                    user_name: user_name,
                    user_role: "普通用户"
                  },
                  success: (res) => {
                    // console.log(res);
                    _this.setData({ isLogin: true, userInfo: res.data.data.user })
                    // 保存到本地
                    wx.setStorageSync('userInfo', res.data.data.user)
                    // _this.setData({ userDetail: res.data.data.user })
                    wx.setStorageSync('token', res.data.data.token)
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      })
    }


  },

  // 收藏-评价-记录
  onTabItemTap(event) {
    if (!this.data.isLogin) {
      wx.showToast({
        title: '未登录~',
        icon: "none",
        duration: 500
      })
    }else {
      const item = event.currentTarget.dataset.item
      if (item.type === 'comment') {
        wx.navigateTo({
          url: `/pages/detail-comment/detail-comment?title=${item.name}`,
        })
      }else {
        wx.navigateTo({
          url: `/pages/detail-collect/detail-collect?tabname=${item.type}&title=${item.name}`,
        })
      }
    }
    
  },

  onSystemTap() {
    wx.navigateTo({
      url: '/pages/system-login/system-login',
    })
  },

})