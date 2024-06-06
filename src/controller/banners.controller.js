const bannersService = require("../service/banners.service")

class BannersController {
  async create(ctx, next) {
    // 1.获取数据库的轮播图数据
    const result = await bannersService.create()
    // console.log(result);
    // 2.返回数据
    ctx.body = {
      message: "获取轮播图成功",
      data: result
    }
  }
}

module.exports = new BannersController()