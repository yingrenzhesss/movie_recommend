// pages/sys-insert/sys-insert.js
import { insertBannersInfo } from "../../service/sys-operation"

Page({
  data: {
    type: "",
    value: "",
    movie_id: "",
    movie_name: "",
    movie_img: ""
  },

  onLoad(options) {
    const type = options.type
    // console.log(type);
    this.setData({ type })
  },
  // 事件处理
  onIdChange(event) {
    this.setData({movie_id: event.detail });
  },
  onNameChange(event) {
    this.setData({movie_name: event.detail });
  },
  onImgChange(event) {
    this.setData({movie_img: event.detail });
  },

  onSubmit() {//提交轮播图信息
    this.fecthBannersInsert()
  },

  // 网络请求
  async fecthBannersInsert() {
    const movie_id = this.data.movie_id
    const movie_name = this.data.movie_name
    const movie_img = this.data.movie_img

    const res = await insertBannersInfo(movie_id, movie_name, movie_img)
    // console.log(res);
    if (res.message === "增加成功") {
      wx.showToast({
        title: '添加轮播图成功~',
        duration: 1500,
        icon: "none"
      })
    }
  }
})