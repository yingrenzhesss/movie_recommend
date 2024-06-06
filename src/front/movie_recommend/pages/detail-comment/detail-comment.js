// pages/detail-comment/detail-comment.js
import { getUserComment } from "../../service/profile"

Page({

  data: {
    userComment: []
  },
  onLoad(options) {
    const title = options.title
    console.log(title);
    this.fecthUserComment()
  },
  // 事件监听方法
  async onDelete() {
    const token = wx.getStorageSync('token')
    const res = await getUserComment(token)
    // console.log(res);
    this.setData({ userComment: res.data })
    wx.showToast({
      title: '删除成功~',
      duration: 1000
    })
  },
  // 网络请求方法
  async fecthUserComment() {
    const token = wx.getStorageSync('token')
    const res = await getUserComment(token)
    // console.log(res);
    this.setData({ userComment: res.data })
  }
})