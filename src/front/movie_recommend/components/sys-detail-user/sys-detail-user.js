// components/sys-detail-user/sys-detail-user.js
import { getUserInfo, deleteUserInfo } from "../../service/sys-operation"

Component({
  data: {
    value: "",
    userInfo: []
  },

 
  methods: {
    // 事件监听方法
    onChange(e) {
      this.setData({ value: e.detail })
    },
    onSearch() {
      if (this.data.value) {
        this.fecthUserInfo()
      }
    },
    onClick() {
      if (this.data.value) {
        this.fecthUserInfo()
      }
    },
    onClear() {
      this.setData({ userInfo: [] })
    },
    onDelectTap(event) {
      const dataset = event.currentTarget.dataset
      const id = dataset.id
      const name = dataset.name

      this.fecthDeleteUser(id, name)
      // this.fecthUserInfo()
    },

    // 网络请求方法
    async fecthUserInfo(){ //查询用户
      const value = this.data.value
      const res = await getUserInfo(value)
      this.setData({ userInfo: res.data })
      // console.log(res);
    },
    async fecthDeleteUser(id, name){ //删除用户
      // console.log(id, name);
      const res = await deleteUserInfo(id, name)
      if (res.message === "删除成功") {
        wx.showToast({
          title: '用户已删除~',
          duration: 1000,
          icon: "none"
        })
      }
    }
  }
})
