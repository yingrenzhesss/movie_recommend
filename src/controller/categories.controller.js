const categoriesService = require("../service/categories.service")

class CategoriesController {
  async create(ctx, next) {
    // 1.接收参数
    const { title, offset, limit } = ctx.query
    // 2.请求分类电影数据
    const result = await categoriesService.create(title, offset, limit)

    // 3.返回数据
    ctx.body = {
      message: "获取分类电影数据成功",
      data: result
    }
  }
}

module.exports = new CategoriesController()