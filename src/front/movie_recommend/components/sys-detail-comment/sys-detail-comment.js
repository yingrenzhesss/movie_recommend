// components/sys-detail-comment/sys-detail-comment.js
import { getCommentInfo, deleteCommentInfo } from "../../service/sys-operation"

Component({
  data: {
    value: "",
    commentInfo: []
  },
  methods: {
    // 事件监听方法
    onChange(e) {
      this.setData({ value: e.detail })
    },
    onSearch() {
      if (this.data.value) {
        this.fecthCommentInfo()
      }
    },
    onClick() {
      if (this.data.value) {
        this.fecthCommentInfo()
      }
    },
    onClear() {
      this.setData({ commentInfo: [] })
    },
    onDelectTap(event) {
      const dataset = event.currentTarget.dataset
      const id = dataset.id
      const name = dataset.name
      const movie_id = dataset.movie_id
      
      this.fecthDeleteComment(id, name, movie_id)
    },

    // 网络请求方法
    async fecthCommentInfo(){ //查询评论
      const value = this.data.value
      const res = await getCommentInfo(value)
      this.setData({ commentInfo: res.data })
      // console.log(res);
    },
    async fecthDeleteComment(id, name, movie_id){ //删除评论
      // console.log(id, name, movie_id);
      const res = await deleteCommentInfo(id, name, movie_id)
      if (res.message === "删除成功") {
        wx.showToast({
          title: '评论已删除~',
          duration: 1000,
          icon: "none"
        })
      }

    }
  }
})
