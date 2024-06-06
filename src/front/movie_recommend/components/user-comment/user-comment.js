// components/user-comment/user-comment.js
import { delectUserComment } from "../../service/profile"

Component({

  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },

  data: {
    
  },

  
  methods: {
    async onDelectTap() {
      const token = wx.getStorageSync('token')
      const time = this.properties.itemData.create_at
      const date = new Date(time);
      date.setHours(date.getHours() + 8);
      const create_at = date.toISOString().slice(0, 19).replace('T', ' ');

      const res = await delectUserComment(token, create_at)
      this.triggerEvent("deleteClick")
    }

  }
})
