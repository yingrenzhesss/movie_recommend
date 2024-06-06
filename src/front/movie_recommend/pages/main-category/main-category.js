// pages/main-category/main-category.js
import { getCateMovies } from "../../service/categories"
Page({

  data: {
    active: 0, //默认激活标题(剧情)
    movieInfo: [],
    offset: 0, 
    title: "剧情",
    movieType: "分类电影"
  },

  onLoad() {
    this.fecthGetCateMovies()
  },

//  事件监听方法
  // onChange(event) {
  //   this.setData({ title: event.detail.title })
  //   this.fecthGetCateMovies()
  // },
  onClick(event) {
    console.log(event.detail);
    this.setData({ title: event.detail.title })
    this.fecthGetCateMovies()
  },
  // 网络请求
  async fecthGetCateMovies() {
    // 1.获取数据
    const res = await getCateMovies(this.data.title, this.data.offset)
    // 2.将新的数据追加到原有数据后面
    const newMovieInfo = [...this.data.movieInfo, ...res.data]
    // 3.设置新数据
    this.setData({ movieInfo: newMovieInfo })
    this.data.offset = this.data.movieInfo.length
  },

  // 监听上拉和加载功能
  onReachBottom() {//上拉
    this.fecthGetCateMovies()
  },
  async onPullDownRefresh() {//下拉
    // 1.清空之前的数据
    this.setData({ movieInfo: [] })
    this.data.offset = 0

    // 2.重新请求数据
    await this.fecthGetCateMovies()

    // 3.请求到数据停止刷新
    wx.stopPullDownRefresh()
  },

})