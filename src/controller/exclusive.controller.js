const exclusiveService = require("../service/exclusive.service");
const cosineSimilarity = require("../utils/similarity")
const sortTypes = require("../utils/sort-types")
const compareString = require("../utils/compare-string")
const sortBySimilarNumber = require("../utils/sort-similarity")

class ExclusiveController {
  async nomal(ctx, next) { //访客用户推送
    const result = await exclusiveService.nomal()
    ctx.body = {
      message: "普通推送~",
      data: result
    }
  }
  // 专属推送
  async create(ctx, next) {
    // 1.获取用户id和用户名
    const { id, user_name } = ctx.user;

    // 2.请求历史记录
    const result1 = await exclusiveService.getHistory(id, user_name)
    const hasHistory = !!result1.length

    // 3.处理相似度
    if (hasHistory) {
      // 返回专属推送
      // 3.1 基本设置
      const allHistorInfo = [] //保存历史记录电影
      const allSimilarity = [] //保存所有相似度
      const allMatchMovies = [] //保存待匹配电影

      for (const history of result1) { //查找历史记录更多电影信息
        const result = await exclusiveService.findMovieById(history.movie_id)
        allHistorInfo.push(result)
      }
      // 3.2 计算历史记录最多的两个类型
      const sortedTypes = sortTypes(allHistorInfo)
      const topTwoKeys = Object.keys(sortedTypes).slice(0, 2);

      // 3.3 根据类型查询所有待匹配电影
      for (const type_key of topTwoKeys) {
        // console.log(type_key, typeof (type_key));
        const result = await exclusiveService.findMovieByTypes(type_key)
        // console.log(result.length);
        for (const movie of result) {
          allMatchMovies.push(movie)
        }
      }

      // 3.4 设置每部电影的初始匹配数组
      const allTwo = []
      for (const history_item of allHistorInfo) {
        const duration1 = parseInt(history_item.duration)
        for (const movie_item of allMatchMovies) {
          let two = [0, 0, 0, 0, 0]
          if (history_item.director === movie_item.director) { //1.比较导演
            two[0] = 1
          } else if (duration1) { //2.比较时长
            const duration2 = parseInt(movie_item.duration)
            if (Math.abs(duration1 - duration2) <= 20) {
              two[1] = 1;
            }
          } else if (compareString(',', history_item.types, movie_item.types) >= 2) { //比较电影类型
            two[2] = 1
          } else if (compareString(',', history_item.region, movie_item.region) >= 1) { //比较地区
            two[3] = 1
          } else if (compareString('/', history_item.actors, movie_item.actors) >= 1) {//比较演员
            two[4] = 1
          }
          let one = [1, 1, 1, 1, 1] //原电影置1
          let similarNumber = cosineSimilarity(one, two)
          allSimilarity.push({
            movie_id: movie_item.movie_id,
            similarNumber
          })
        }
      }
      // 4.排序相似度
      const sort_result = await sortBySimilarNumber(allSimilarity).slice(0, 30)

      // 5.请求推送电影，返回给前端推送电影
      const allPushMovie = []
      for (let i = 0; i < sort_result.length; i++) {
        const result = await exclusiveService.findMovieBymovieId(sort_result[i].movie_id)
        allPushMovie.push(result[0])
      }
      ctx.body = {
        message: "推送电影成功",
        data: allPushMovie
      }

    } else { //没有历史记录时
      const result = await exclusiveService.nomal()
      ctx.body = {
        message: "普通推送~",
        data: result
      }
    }
  }

}

module.exports = new ExclusiveController()