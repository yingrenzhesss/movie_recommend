const {
  UNAUTHORIZATION,
} = require("../config/error")
const loginService = require("../service/login.service")

const movieintroService = require("../service/movieintro.service")
const jwt = require("jsonwebtoken")

class MovieIntroController {
  // 获取基本信息
  async create(ctx, next) {
    // 1.获取电影id
    const { movie_id, movieType } = ctx.query

    // 根据id,类型请求信息
    if (movieType === '为你推荐') {
      const result = await movieintroService.recommendMovie(movie_id)
      // 2.返回数据
      ctx.body = {
        message: "获取更多推荐电影详细数据成功",
        data: result
      }
    } else if (movieType === '正在热映') {
      const result = await movieintroService.hotMovie(movie_id)
      // 返回数据
      ctx.body = {
        message: "获取更多正在热映电影详细数据成功",
        data: result
      }
    } else if (movieType === '即将上映') {
      const result = await movieintroService.laterMovie(movie_id)
      // 返回数据
      ctx.body = {
        message: "获取更多即将上映电影详细数据成功",
        data: result
      }
    } else if (movieType === '分类电影') {
      const result = await movieintroService.categoriesMovie(movie_id)
      // 返回数据
      ctx.body = {
        message: "获取更多分类电影详细数据成功",
        data: result
      }
    }

  }
  // 上传收藏
  async collect(ctx, next) {
    // 1.获取收藏的电影id，名字。用户token
    const { movie_id, movie_name, user_token, movieType } = ctx.request.body
    try {
      // 验证token中的信息
      const secret = "this is a secret key"
      const result = jwt.verify(user_token, secret)
      const { user_openid } = result
      const user = await loginService.findByOpenId(user_openid)
      ctx.user = user[0]

    } catch (error) {
      ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }
    // 2.调用收藏接口
    const { id, user_name } = ctx.user
    // 3.查看有没有收藏记录
    const user_id = id
    const isCollect = await movieintroService.isCollect(movie_id, user_id)
    // 4.没收藏则收藏，有收藏则跳过
    if (!isCollect) {
      const result = await movieintroService.collect(movie_id, movie_name, user_id, user_name, movieType)
      // console.log(result);
      // 5.返回数据
      ctx.body = {
        message: "电影收藏成功",
        data: result
      }
    }
  }
  // 取消收藏
  async cancelCollect(ctx, next) {
    // 1.获取收藏的电影id，名字。用户token
    const { movie_id, movie_name, user_token } = ctx.request.body

    try {
      // 验证token中的信息
      const secret = "this is a secret key"
      const result = jwt.verify(user_token, secret)
      const { user_openid } = result
      const user = await loginService.findByOpenId(user_openid)
      ctx.user = user[0]

    } catch (error) {
      ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }
    // 2.调用取消收藏接口
    const { id } = ctx.user
    const user_id = id

    const result = await movieintroService.cancelCollect(movie_id, user_id)
    // console.log(result);
    // 5.返回数据
    ctx.body = {
      message: "电影取消收藏成功",
      data: result
    }
  }
  // 历史记录
  async history(ctx, next) {
    // 1.获取收藏的电影id，名字。用户token
    const { movie_id, movie_name, movieType } = ctx.request.body
    // 2.存储历史记录
    const { id, user_name } = ctx.user
    const user_id = id
    const result = await movieintroService.history(movie_id, movie_name, user_id, user_name, movieType)
    // 3.返回数据
    ctx.body = {
      message: "历史记录存储成功",
      data: result
    }
  }
  async comment(ctx, next) {
    // 1.获取收藏的电影id
    const { movie_id } = ctx.query
    // 2.查询电影评论记录
    const result = await movieintroService.comment(movie_id)
    // 3.返回数据
    ctx.body = {
      message: "电影评论记录查询成功",
      data: result
    }
  }
}

module.exports = new MovieIntroController()