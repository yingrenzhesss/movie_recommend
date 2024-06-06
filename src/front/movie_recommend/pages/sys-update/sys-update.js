// pages/sys-update/sys-update.js
import { updateMovieInfo, getSystemInfo, updateSystemInfo, updateSystemSecret } from "../../service/sys-operation"
Page({
  data: {
    type: "movie", //修改类型
    movie_name: "",
    movieInfo: {}, //修改电影
    movie_id: "",
    title: "",
    score: "",
    duration: "",
    types: "",
    region: "",
    director: "",
    description: "",

    systemRole: {},
    origin_name: "",
    user_name: "",
    user_role: "",
    status: 2,
    user_avatar: "",

    oldPassword: "",
    newPassword: "",
    confirePassword: ""
  },

  onLoad(options) {
    const _this = this
    const type = options.type

    // 1.电影修改
    const movie_id = options.movie_id
    const movie_name = options.movie_name
    this.setData({ type, movie_id, movie_name })
    // 1.1 监听传递来的电影
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('ToMovieInfo', function(res) {
      _this.setData({ movieInfo: res.data })
    })
    // 1.2 设置基本信息
    const movieInfo = this.data.movieInfo
    this.setData({ 
      movie_id: movieInfo.movie_id,
      title: movieInfo.title,
      score: movieInfo.score,
      duration: movieInfo.duration,
      types: movieInfo.types,
      region: movieInfo.region,
      director: movieInfo.director,
      description: movieInfo.description
     })
    //  2.个人中心
    const origin_name = wx.getStorageSync('user_name')
    if (origin_name) {
      this.setData({ origin_name })
      this.fecthSystemInfo()
    }
    //  3.密码修改
  },

  // 事件监听的方法
  // 电影信息修改
  onIdChange(event) {
    this.setData({movie_id: event.detail });
  },
  onTitleChange(event) {
    this.setData({title: event.detail });
  },
  onScoreChange(event) {
    this.setData({score: event.detail });
  },
  onDurationChange(event) {
    this.setData({duration: event.detail });
  },
  onDirectorChange(event) {
    this.setData({director: event.detail });
  },
  onTypesChange(event) {
    this.setData({types: event.detail });
  },
  onRegionChange(event) {
    this.setData({region: event.detail });
  },
  onDescriptionChange(event) {
    this.setData({description: event.detail });
  },
  onSubmit() { //提交修改
    this.fetchUpdateMovieInfo()
  },

  // 个人中心资料管理
  onSysNameChange(event) {
    this.setData({user_name: event.detail });
  },
  onStatusChange(event) {
    this.setData({status: event.detail });
  },
  onRoleChange(event) {
    this.setData({user_role: event.detail });
  },
  onAvatarChange(event) {
    this.setData({user_avatar: event.detail });
  },
  onSysSubmit() { //提交修改
    this.fetchUpdateSystemInfo()
  },

  // 个人中心密码修改
  onOldSecretChange(event) {
    this.setData({oldPassword: event.detail });
  },
  onNewSecretChange(event) {
    this.setData({newPassword: event.detail });
  },
  onConfireSecretChange(event) {
    this.setData({confirePassword: event.detail });
  },
  onSysSecretSubmit() {
    this.fecthUpdateSystemSecret()
  },

  // 网络请求的方法
  // 电影修改
  async fetchUpdateMovieInfo() {
    const movie_id = this.data.movie_id
    const title = this.data.title
    const score = this.data.score
    const duration = this.data.duration
    const types = this.data.types
    const region = this.data.region
    const director = this.data.director
    const description = this.data.description
    const res = await updateMovieInfo(movie_id, title, score, duration, director, types, region, description)
    wx.showToast({
      title: '已修改',
      duration: 1500,
      icon: "none"
    })
  },
// 个人中心修改
  async fecthSystemInfo() {
    const user_name = wx.getStorageSync('user_name')
    const res = await getSystemInfo(user_name)
    // console.log(res.data[0]);
    this.setData({ systemRole: res.data[0] })
  },
  async fetchUpdateSystemInfo() {
    const origin_name = this.data.origin_name
    const user_name = this.data.user_name
    const status = this.data.status
    const user_role = this.data.user_role
    const user_avatar = this.data.user_avatar
    const res = await updateSystemInfo(user_name, status, user_role, user_avatar, origin_name)
    // console.log(res);
    wx.showToast({
      title: '管理员信息修改成功',
      duration: 1500,
      icon: "none"
    })
  },
  // 密码修改
  async fecthUpdateSystemSecret() {
    const oldPassword = this.data.oldPassword
    const newPassword = this.data.newPassword
    const confirePassword = this.data.confirePassword
    const user_name = wx.getStorageSync('user_name')
    const res = await updateSystemSecret(user_name, oldPassword, newPassword, confirePassword)
    // console.log(res);
    if (res.code === -1004) {
      wx.showToast({
        title: res.message,
        duration: 1500,
        icon: "none"
      })
    }else if(res.code === -1008) {
      wx.showToast({
        title: res.message,
        duration: 1500,
        icon: "none"
      })
    }else if(res.code === 0) {
      wx.showToast({
        title: res.message,
        duration: 1500,
        icon: "none"
      })
    }
  }
})