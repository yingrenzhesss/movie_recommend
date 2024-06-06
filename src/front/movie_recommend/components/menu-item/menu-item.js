// components/menu-item/menu-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    title: {
      type: String,
      value: "为你推荐"
    }
  },
  methods: {
    onMenuItemTap() {
      const movie_id = this.properties.itemData.movie_id
      const title = this.properties.itemData.title
      const movieType = this.properties.title
      wx.navigateTo({
        url: `/pages/movie-intro/movie-intro?movie_id=${movie_id}&movieType=${movieType}&title=${title}`,
      })
    }
  },
  lifetimes: {
    ready() {
      console.log(typeof(this.properties.type), this.properties.type);
    }
  }
})
