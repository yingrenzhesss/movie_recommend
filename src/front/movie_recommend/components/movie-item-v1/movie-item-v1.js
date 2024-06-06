// components/movie-item-v1/movie-item-v1.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    movieType: {
      type: String,
      value: "为你推荐"
    }
  },
  methods: {
    onMovieItemTap() {
      const movie_id = this.properties.itemData.movie_id
      const title = this.properties.itemData.title
      const movieType = this.properties.movieType
      console.log(title);
      wx.navigateTo({
        url: `/pages/movie-intro/movie-intro?movie_id=${movie_id}&movieType=${movieType}&title=${title}`,
      })
    }
  }
})
