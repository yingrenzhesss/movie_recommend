// pages/main-home/main-home.js
import { getHomeBanners, getExclusivePushMovies, getNomalPushMovies } from "../../service/home"

import recommendStore from "../../store/recommendStore"
import hotStore from "../../store/hotStore"
import laterStore from "../../store/laterStore"

// const querySelectThrottle = throttle(querySelect, 200)
const app = getApp()
Page({

  data: {
    searchValue: "",  //vant搜索框默认要传
    screenWidth: 150, //搞定不同机型的滑动宽度
    bannerHeight: 150, //根据机型动态修改轮播图高度,与点保持一致

    banners: [],  //轮播图
    hotMovies: [], //热映电影
    laterMovies: [], //即将上映电影
    recommendMoviesInfo: [], //推荐电影
    pushMovies: [], //推送电影
    isLogin: false,
    isPush: false //已经推送
  },

  onLoad() {
    // 1.获取轮播图数据
    this.fecthGetBanners()
    // 2.获取屏幕尺寸
    this.setData({ screenWidth: app.globalData.screenWidth })

    // 共享数据监听  //监听store里的recommendMovies改变，然后赋值，起到数据共享作用
    // 3.发起action
    // 3.1 获取推荐电影数据
    recommendStore.dispatch("fecthRecommendMoviesAction")
    // 3.2 获取正在热映电影数据
    hotStore.dispatch("fecthHotMoviesAction")
    // 3.3 获取即将上映电影数据
    laterStore.dispatch("fecthLaterMoviesAction")

    // 4.监听数据
    recommendStore.onState("recommendMovies", (value) => {
      this.setData({ recommendMoviesInfo: value.slice(0, 6) })
    })
    hotStore.onState("hotMovies", (value) => {
      this.setData({ hotMovies: value })
    })
    laterStore.onState("laterMovies", (value) => {
      this.setData({ laterMovies: value })
    })
  },
  onShow() {
    // 判断是否登录
    const token = wx.getStorageSync('token')
    if (token) {
      this.setData({ isLogin: true })
    }
    // 5.获取专属推荐电影
    // 根据登录状态和推送设置执行不同的推送
    if (!this.data.isLogin) {//未登录
      this.fecthNomalPush()
    }else if (this.data.isLogin && !this.data.isPush) {//登录且还没推送
      this.fecthGetPushMovies()
    }
  },

// ======界面的事件监听方法=====
  onBannersTap(event) {//轮播图点击
    const dataset = event.currentTarget.dataset
    const movie_id = dataset.movie_id
    const title = dataset.movie_name
    const movieType = "正在热映"
    wx.navigateTo({
      url: `/pages/movie-intro/movie-intro?movie_id=${movie_id}&movieType=${movieType}&title=${title}`,
    })
  },
  onSearchClick() {//跳转搜索
    wx.switchTab ({ url: '/pages/main-search/main-search' })
  },

  onRecommendMoreClick() {
    // 点击更多跳转至电影详情页detail-movie,与榜单共享，需要传递type参数
    wx.navigateTo({
      url: '/pages/detail-movie/detail-movie?type=recommend',
    })
  },

// 网络请求方法=======
  // 请求轮播图数据
  async fecthGetBanners() {
    const res = await getHomeBanners()
    console.log(res);
    this.setData({ banners: res.data })
  },

  async fecthGetPushMovies() {
    const user_token = wx.getStorageSync('token')
    if(user_token) {
      const res = await getExclusivePushMovies(user_token)
      // console.log(res);
      this.setData({ pushMovies: res.data })
      this.setData({ isPush: true })
    }
  },
  async fecthNomalPush (){
    const res = await getNomalPushMovies()
    this.setData({ pushMovies: res.data })
  }

})
