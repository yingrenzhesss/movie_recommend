// components/sys-detail-movie/sys-detail-user.js
import { getMovieInfo, deleteMovieInfo } from "../../service/sys-operation"

Component({
  data: {
    value: "",
    movieInfo: []
  },

  methods: {
    // 事件监听方法
    onChange(e) {
      this.setData({ value: e.detail })
    },
    onSearch() {
      if (this.data.value) {
        this.fecthMovieInfo()
      }
    },
    onClick() {
      if (this.data.value) {
        this.fecthMovieInfo()
      }
    },
    onClear() {
      this.setData({ movieInfo: [] })
    },

    onUpdateTap(event) {//修改电影
      const dataset = event.currentTarget.dataset
      const movie = dataset.movie
      const movie_id = dataset.movie_id
      const movie_name = dataset.movie_name
      wx.navigateTo({
        url: `/pages/sys-update/sys-update?type=movie&movie_id=${movie_id}&movie_name=${movie_name}`,
        success: function(res) {
          res.eventChannel.emit('ToMovieInfo', { data: movie })
        }
      })
      // this.fecthUserInfo()
    },
    onDelectTap(event) {//删除电影
      const dataset = event.currentTarget.dataset
      const movie_id = dataset.movie_id
      const movie_name = dataset.movie_name
  
      this.fecthDeleteMovie(movie_id, movie_name)
      // this.fecthUserInfo()
    },

    // 网络请求方法
    async fecthMovieInfo(){ //查询电影
      const value = this.data.value
      const res = await getMovieInfo(value)
      this.setData({ movieInfo: res.data })
      // console.log(res);
    },
    async fecthDeleteMovie(movie_id, movie_name){ //删除用户
      // console.log(movie_id, movie_name);
      const res = await deleteMovieInfo(movie_id, movie_name)
      // console.log(res);
      if (res.message === "删除成功") {
        wx.showToast({
          title: '电影已删除~',
          duration: 1000,
          icon: "none"
        })
      }

    }
  }
})