const hotMovieService = require("../service/hotmovie.service")

class hotMovieController {
  async create(ctx, next) {
    // 1.获取正在热映数据
    const { offset, limit } = ctx.query
    const result = await hotMovieService.create(offset, limit)
    // console.log(result);
    // 2.返回数据
    ctx.body = {
      message: "获取热映数据成功",
      data: result
    }
  }
}

module.exports = new hotMovieController() 