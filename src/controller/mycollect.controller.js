const mycollectService = require("../service/mycollect.service")

class MyCollectController {
  async create(ctx, next) {
    // 1.获取用户id与名字
    const { id, user_name } = ctx.user
    // 2.请求用户的收藏记录
    const result = await mycollectService.create(id, user_name)
    // 3.返回数据
    ctx.body = {
      message: "查询我的收藏成功~",
      data: result
    }
  }
}

module.exports = new MyCollectController()