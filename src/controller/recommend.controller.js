const recommendService = require("../service/recommend.service")

class RecommendController {
  async create(ctx, next) {
    // 1.获取推荐电影数据
    const result = await recommendService.create()
    // 2.返回数据
    ctx.body = {
      message: "获取推荐电影数据成功",
      data: result
    }
  }
}

module.exports = new RecommendController()