const mycommentService = require("../service/mycomment.service");

class MyCommentController {
  async create(ctx, next) {
    // 1.1.获取用户id与名字
    const { id, user_name } = ctx.user
    const user_id = id

    // 2.请求用户的评论记录
    const res = await mycommentService.create(user_id, user_name)
    // 3.返回数据
    ctx.body = {
      message: "查询我的评论成功~",
      data: res
    }
  }
  async delect(ctx, next) {
    // 1.获取用户id与名字
    const { id, user_name } = ctx.user
    const { create_at } = ctx.request.body

    const user_id = id
    // 2.删除用户的评论记录
    const res = await mycommentService.delete(user_id, user_name, create_at)
    // 3.返回数据
    ctx.body = {
      message: "删除我的评论成功~",
      data: res
    }
  }
}

module.exports = new MyCommentController()