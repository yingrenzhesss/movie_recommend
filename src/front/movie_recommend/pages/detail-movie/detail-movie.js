// pages/detail-movie/detail-movie.js
import recommendStore from "../../store/recommendStore"

Page({

  data: {
    type: "recommend", //保存传递来的类型
    movieInfo: [], //所有推荐电影
    movie_id: "" //电影id
  },

  onLoad(options) {
    // 1.确定获取的数据类型
    // type ==> recommend
    const type = options.type
    this.setData({ type })

    // 从store获取数据
    if (type === "recommend") {
      recommendStore.onState("recommendMovies", this.handleRecommend)
    }
  },

  // =============store中共享数据=============
  handleRecommend(value) {
    this.setData({ movieInfo: value })
    wx.setNavigationBarTitle({
      title: '为你推荐',
    })
  },


  onUnload() {
    if (this.data.type === "recommend") {
      recommendStore.offState("recommendMovies", this.handleRecommend)
    }
  }
})