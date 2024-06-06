// components/sys-detail-banners/sys-detail-banners.js
import { getBannersInfo, deleteBannersInfo } from "../../service/sys-operation"

Component({
  properties: {
  },

  data: {
    bannersInfo: []
  },
  lifetimes: {
    attached() {
      this.fecthBannersInfo()
    }
  },

  methods: {
    // 事件监听
    onInsertTap() {
      wx.navigateTo({
        url: '/pages/sys-insert/sys-insert?type=banners',
      })
    },
    onDelectTap(event) {
      const dataset = event.currentTarget.dataset
      const movie_id = dataset.movie_id
      const movie_name = dataset.movie_name
      this.fecthDeleteBanners(movie_id, movie_name)
    },

    async fecthBannersInfo() {
      const res = await getBannersInfo()
      // console.log(res);
      this.setData({ bannersInfo: res.data })
    },

    async fecthDeleteBanners(movie_id, movie_name){ //删除轮播图
      // console.log(movie_id, movie_name);
      const res = await deleteBannersInfo(movie_id, movie_name)
      // console.log(res);
      if (res.message === "删除成功") {
        this.fecthBannersInfo()
        wx.showToast({
          title: '轮播图已删除~',
          duration: 1000,
          icon: "none"
        })
      }

    }
  }
})
