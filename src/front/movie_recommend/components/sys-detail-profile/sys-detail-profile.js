// components/sys-detail-profile/sys-detail-profile.js
Component({
  properties: {
    sysInfo: {
      type: Object,
      value: {}
    }
  },
  data: {
    user_name: "",
    user_avatar: "",
    systemRole: {}
  },
  lifetimes: {
    ready() {
      const user_name = wx.getStorageSync('user_name')
      const user_avatar = wx.getStorageSync('user_avatar')
      // console.log(user_name, user_avatar);
      this.setData({user_name, user_avatar})
    }
  },
  methods: {
    // 事件监听的方法
    onUpdateTap() {
      const user_name = wx.getStorageSync('user_name')
      wx.navigateTo({
        url: `/pages/sys-update/sys-update?type=system_role&user_name=${user_name}`,
      })
    },
    onUpdateSecretTap() {
      const user_id = wx.getStorageSync('user_id')
      const user_name = wx.getStorageSync('user_name')
      wx.navigateTo({
        url: `/pages/sys-update/sys-update?type=system_secret&user_id=${user_id}&user_name=${user_name}`,
      })
    },
    onQuitTap() {
      wx.switchTab({
        url: '/pages/main-profile/main-profile',
      })
    },
  }
})
