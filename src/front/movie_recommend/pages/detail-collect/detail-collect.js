// pages/detail-collect/detail-collect.js
import { getUserCollectMovies, getUserHistoryMovies } from "../../service/profile"
Page({

  data: {
    movieInfo: [] //个人电影信息
  },

 
  onLoad(options) {
    const tabname = options.tabname
    const title = options.title
    if (tabname === "favor") {
      this.handleCollect()
      wx.setNavigationBarTitle({
        title
      })
    }else if ( tabname === "history") {
      this.handleHistory()
      wx.setNavigationBarTitle({
        title
      })
    }

  },

  // 处理收藏-历史记录
  async handleCollect(){
    const token = wx.getStorageSync('token')
    const res = await getUserCollectMovies(token)
    this.setData({ movieInfo: res.data })
  },
  async handleHistory(){
    const token = wx.getStorageSync('token')
    const res = await getUserHistoryMovies(token)
    // console.log(res);
    this.setData({ movieInfo: res.data.reverse() })
  }
  
})