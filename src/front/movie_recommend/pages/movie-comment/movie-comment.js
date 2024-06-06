// pages/movie-comment/movie-comment.js
import { postMovieComment } from "../../service/movie-intro"
Page({

  data: {
    movie_id:"",
    title: "电影名字",
    content: '', // 评价的内容
    score: 5, // 评价的分数

    token: ""
  },
 
  onLoad(options) {
    const title = options.title
    const movie_id = options.movie_id
    this.setData({ title, movie_id })
    const token = wx.getStorageSync('token')
    this.setData({ token })
  },
  // 事件监听的方法
  onContentChange(event) {
    this.setData({
      content: event.detail
    });
  },

  onScoreChange(event) {
    this.setData({
      score: event.detail
    });
  },
  // 评论提交内容至后端
  submit() {
    this.fecthPostMovieComment()
    wx.showToast({
      title: '感谢评论~',
      icon:"none"
    })
  },

  // 网络请求方法
  async fecthPostMovieComment() {
    const movie_id = this.data.movie_id
    const movie_name = this.data.title
    const content = this.data.content
    const score = this.data.score
    const user_token = this.data.token
    const res = await postMovieComment(movie_id, movie_name, content, score, user_token)
  }
})