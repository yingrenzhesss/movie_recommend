const searchService = require("../service/search.service");

class SearchController {
  async create(ctx, next) {
    // 1.获取搜索关键词
    const { value } = ctx.query
    // console.log(value);
    // 2.根据关键词查询电影信息
    const result = await searchService.create(value)
    // console.log(result);
    // 3.返回数据
    ctx.body = {
      message: "获取搜索电影信息成功",
      data: result
    }
  }
}

module.exports = new SearchController()