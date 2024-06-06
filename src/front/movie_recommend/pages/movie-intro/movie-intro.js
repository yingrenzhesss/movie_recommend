// pages/movie-intro/movie-intro.js
import { 
  getMovieIntro, getMovieCollect, getCancelMovieCollect, postMovieHistory, getMovieComments 
} from "../../service/movie-intro"
const app = getApp()
Page({
  data: {
    movie_id: "",
    title: "电影名字",
    movieType: "电影类型",
    movieInfo: {}, //电影信息
    actors: [], // 演员信息
    movieComment: [], //评论信息
    isExpanded: false,

    screenWidth: 375,
    isLogin: false,
    isCollect: false
  },

  onLoad(options) {
    // 检查 token 是否存在
    const token = wx.getStorageSync('token');
    if (token) {
      // token 存在
      this.setData({ isLogin: true })
    }
    this.setData({ screenWidth: app.globalData.screenWidth })
    
    const movie_id = options.movie_id
    const title = options.title
    const movieType = options.movieType
    this.setData({ movie_id, title, movieType })

    this.fecthMovieIntro() //请求基本电影数据
    this.fecthMovieComment()//请求电影评论信息

    if (this.data.isLogin) {
      this.fecthMovieHistory(movie_id, this.data.movieInfo.title, token, movieType)
    }
  },

  // 上传历史记录
  onReady() {
    const token = wx.getStorageSync('token')
    const movie_id = this.data.movie_id
    const title = this.data.title
    const movieType = this.data.movieType
    if (token) {
      this.fecthMovieHistory(movie_id,title, token, movieType)
    }
  },
  // 事件监听方法
  expandText() {
    this.setData({ isExpanded: true })
  },
  onCollectTap() {
    if (!this.data.isLogin) {
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration: 1500, // 弹窗持续时间(毫秒）
      })
    }else {
      // 收藏并显示收藏成功
      if (!this.data.isCollect) {
        this.fecthMovieCollect()
        this.setData({ isCollect: true })
        wx.showToast({
          title: '已收藏~',
          icon: "none",
          duration: 1500, 
        })
      }else {
        // 取消收藏
        this.fecthMovieCancelCollect()
        this.setData({ isCollect: false })
        wx.showToast({
          title: '已取消~',
          icon: "none",
          duration: 1500, 
        })
      }
    }
  },
  onCommentTap() {
    if (!this.data.isLogin) {
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration: 1500, // 弹窗持续时间(毫秒）
      })
    }else {
      const title = this.data.movieInfo.title
      const movie_id = this.data.movie_id
      wx.navigateTo({
        url: `/pages/movie-comment/movie-comment?movie_id=${movie_id}&title=${title}`,
      })
    }
  },

  // 网络请求方法
  async fecthMovieIntro() { //电影信息
    const res = await getMovieIntro(this.data.movie_id, this.data.movieType)
    const actors = res.data[0].actors.reverse()
    this.setData({ movieInfo: res.data[0], actors: actors })
  },
  async fecthMovieCollect() { //收藏
    const movieInfo = this.data.movieInfo
    const token = wx.getStorageSync('token')
    const movieType = this.data.movieType
    const res = await getMovieCollect(movieInfo.movie_id, movieInfo.title, token, movieType)
    // console.log(res);
  },
  async fecthMovieCancelCollect() { //取消收藏
    const movieInfo = this.data.movieInfo
    const token = wx.getStorageSync('token')
    const res = await getCancelMovieCollect(movieInfo.movie_id, movieInfo.title, token)
    // console.log(res);
  },

  async fecthMovieHistory(movie_id, title, token, movieType) { //上传历史记录
    const res = await postMovieHistory(movie_id, title, token, movieType)
    // console.log(res);
  },
  async fecthMovieComment() { //电影评论信息
    const res = await getMovieComments(this.data.movie_id)
    // console.log(res);
    this.setData({ movieComment: res.data })

  }

})