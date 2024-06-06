const {
  PASSWORD_IS_INCORRECT,
  TWO_PASSWORD_DO_NOT_MATCH
} = require("../config/error")

const sysService = require("../service/sysoperation.service")
const md5password = require('../utils/md5-crypto')

class SysController {
  // 用户管理
  async userSearch(ctx, next) {
    // 1.获取搜索内容
    const { value } = ctx.query

    // 2.查询数据库
    const result = await sysService.userSearch(value)
    // 3.返回数据
    ctx.body = {
      message: "用户查询成功",
      data: result
    }
  }
  async userDelete(ctx, next) {
    try {
      // 1.获取搜索内容
      const { id, name } = ctx.request.body
      // console.log(id, name);
      // 2.查询数据库
      const result = await sysService.userDelete(id, name)
      // 3.返回数据
      ctx.body = {
        message: "删除成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "删除失败"
      }
    }
  }

  // 电影管理
  async movieSearch(ctx, next) {
    // 1.获取搜索内容
    const { value } = ctx.query

    // 2.查询数据库
    const result = await sysService.movieSearch(value)
    // 3.返回数据
    ctx.body = {
      message: "电影查询成功",
      data: result
    }
  }
  async movieUpdate(ctx, next) {
    try {
      // 1.获取搜索内容
      const { movie_id, title, score, duration, director, types, region, description } = ctx.request.body
      const movieId = movie_id
      // 2.查询数据库
      const result = await sysService.movieUpdate(movie_id, title, score, duration, director, types, region, description, movieId)
      // 3.返回数据
      ctx.body = {
        message: "修改成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "修改失败"
      }
    }
  }
  async movieDelete(ctx, next) {
    try {
      // 1.获取搜索内容
      const { movie_id, title } = ctx.request.body
      // console.log(movie_id, title);
      // 2.查询数据库
      const result = await sysService.movieDelete(movie_id, title)
      // 3.返回数据
      ctx.body = {
        message: "删除成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "删除失败"
      }
    }
  }

  // 评论管理
  async commentSearch(ctx, next) {
    // 1.获取搜索内容
    const { value } = ctx.query
    // console.log(value);
    // 2.查询数据库
    const result = await sysService.commentSearch(value)
    // 3.返回数据
    ctx.body = {
      message: "评论查询成功",
      data: result
    }
  }
  async commentDelete(ctx, next) {
    try {
      // 1.获取搜索内容
      const { id, name, movie_id } = ctx.request.body
      // console.log(id, name, movie_id);
      // 2.查询数据库
      const result = await sysService.commentDelete(id, name, movie_id)
      // 3.返回数据
      ctx.body = {
        message: "删除成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "删除失败"
      }
    }
  }

  // 轮播图
  async bannerSearch(ctx, next) {
    // 1.获取数据库的轮播图数据
    const result = await sysService.bannersSearch()
    // 2.返回数据
    ctx.body = {
      message: "获取轮播图成功",
      data: result
    }
  }
  async bannerDelete(ctx, next) {
    try {
      // 1.获取搜索内容
      const { movie_id, movie_name } = ctx.request.body
      // console.log(movie_id, movie_name);
      // 2.查询数据库
      const result = await sysService.bannersDelete(movie_id, movie_name)
      // 3.返回数据
      ctx.body = {
        message: "删除成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "删除失败"
      }
    }
  }
  async bannerInsert(ctx, next) {
    try {
      // 1.获取搜索内容
      const { movie_id, movie_name, movie_img } = ctx.request.body
      // console.log(movie_id, movie_name, movie_img);
      // 2.查询数据库
      const result = await sysService.bannerInsert(movie_id, movie_name, movie_img)
      // 3.返回数据
      ctx.body = {
        message: "增加成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "增加失败"
      }
    }
  }

  // 个人中心
  async systemSearch(ctx, next) {
    // 1.获取管理员名称
    const { user_name } = ctx.query
    // 2.查询数据
    const result = await sysService.systemSearch(user_name)
    // 3.返回数据
    ctx.body = {
      message: "查询成功",
      data: result
    }
  }
  async systemUpdate(ctx, next) {
    try {
      // 1.获取搜索内容
      const { user_name, status, user_role, user_avatar, origin_name } = ctx.request.body
      const userName = origin_name
      // 2.查询数据库
      const result = await sysService.systemUpdate(user_name, status, user_role, user_avatar, userName)
      // 3.返回数据
      ctx.body = {
        message: "管理员资料修改成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "修改失败"
      }
    }
  }
  async systemSecretUpdate(ctx, next) {
    try {
      // 1.获取搜索内容
      const { user_name, oldPassword, newPassword, confirePassword } = ctx.request.body
      console.log(user_name, oldPassword, newPassword, confirePassword);
      // 2.获取管理员的账号密码
      const oldSecret = await sysService.oldSecretSearch(user_name)
      //3.验证原密码
      if (oldSecret.user_openid !== md5password(oldPassword)) {
        return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
      }
      if (newPassword !== confirePassword) {
        return ctx.app.emit('error', TWO_PASSWORD_DO_NOT_MATCH, ctx)
      }
      // 4.更改密码
      // 4.1密码加密
      const recentSecret = md5password(newPassword)
      const result = await sysService.systemSecretUpdate(user_name, recentSecret)
      // 5.返回数据
      ctx.body = {
        code: 0,
        message: "密码更改成功",
        data: result
      }
    } catch (error) {
      ctx.body = {
        message: "密码更改失败"
      }
    }
  }
}

module.exports = new SysController()