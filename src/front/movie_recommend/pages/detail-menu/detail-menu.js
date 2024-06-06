// pages/detail-menu/detail-menu.js
import hotStore from "../../store/hotStore"
import laterStore from "../../store/laterStore"

Page({
  data: {
    type: "为你推荐", //传递的menu类型 
    menuMovies: []
  },

  onLoad(options) {
    const type = options.type //获取展示类型
    this.setData({ type })
    
    if (type === "正在热映") {
      hotStore.onState("hotMovies", this.handleMenuMovies)
    }else if (type === "即将上映") {
      laterStore.onState("laterMovies", this.handleMenuMovies)
    }
  },

  //从store共享数据
  handleMenuMovies(value) {
    const type = this.data.type
    this.setData({ menuMovies: value })
    wx.setNavigationBarTitle({
      title: type,
    })
  },

  onUnload() {
    if (this.data.type === "正在热映") {
      hotStore.offState("hotMovies", this.handleMenuMovies)
    }else if(type === "即将上映") {
      laterStore.offState("laterMovies", this.handleMenuMovies)
    }
  }
})