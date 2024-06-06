// components/hot-item/hot-item.js
Component({
  // 接收电影
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    title: {
      type: String,
      value: "默认电影"
    },
    movieType: {
      type: String,
      value: "正在热映"
    }
  },
  methods: {
    onHotItemTap() {
      const movie_id = this.properties.itemData.movie_id
      const title = this.properties.itemData.title
      const movieType = this.properties.movieType
      wx.navigateTo({
        url: `/pages/movie-intro/movie-intro?movie_id=${movie_id}&movieType=${movieType}&title=${title}`,
      })
    }
  }
})
