// components/movie-item-v2/movie-item-v2.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    movieType:{
      type: String,
      value: "为你推荐"
    },
    index: {
      type: Number,
      value: -1
    }
  },
  methods: {
    onMovieItemTap() {
      const movie_id = this.properties.itemData.movie_id //拿到电影id
      const title = this.properties.itemData.title //拿到电影id
      const movieType = this.properties.movieType
      // console.log(id);
      wx.navigateTo({
        url: `/pages/movie-intro/movie-intro?movie_id=${movie_id}&movieType=${movieType}&title=${title}`,
      })
    }
  }
})
