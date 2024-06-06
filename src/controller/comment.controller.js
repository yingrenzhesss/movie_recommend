const { UNAUTHORIZATION } = require("../config/error")
const jwt = require("jsonwebtoken")

const loginService = require("../service/login.service")
const commentService = require("../service/comment.service")


class commentController {
  async create(ctx, next) {
    // 1.获取用户评论的信息
    const { movie_id, movie_name, content, rating, user_token } = ctx.request.body

    // 2.验证token中的信息，拿到user_id
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
    const { id, user_name } = ctx.user
    const user_id = id
    // 3.将评论保存到数据库
    const result = await commentService.create(user_name, movie_name, movie_id, user_id, rating, content)
    // 4.返回数据
    ctx.body = {
      message: "评论成功",
      data: result
    }
  }
}

module.exports = new commentController()