const laterMovieService = require("../service/latermovie.service")

class LaterMovieController {
  async create(ctx, next) {
    // 1.获取即将上映数据
    const { offset, limit } = ctx.query
    const result = await laterMovieService.create(offset, limit)

    // 2.返回数据
    ctx.body = {
      message: "获取即将上映电影数据成功",
      data: result
    }
  }
}

module.exports = new LaterMovieController() 