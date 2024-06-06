// pages/main-search/main-search.js
import { getSearchMovies } from "../../service/search"

Page({
  data: {
    value: "", //输入框的值
    movieInfo: [], //电影信息
    noMovie: false
  },

  onLoad(options) {

  },

  //事件监听方法
  onChange(e) {
    this.setData({ value: e.detail })
  },
  onSearch() {
    if (this.data.value) {
      this.fecthGetSearchMovies()
    }
  },
  onClick() {
    if (this.data.value) {
      this.fecthGetSearchMovies()
    }
  },
  onClear() {
    this.setData({ movieInfo: [] })
  },

  // 网络请求方法
  async fecthGetSearchMovies() {
    const value = this.data.value
    const res = await getSearchMovies(value)
    this.setData({ movieInfo: res.data })
    // console.log(res);
  },
  onHide() {
    this.setData({ movieInfo: [], value: "" })
  },
})