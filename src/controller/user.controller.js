const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    // 1.获取管理员传递过来的数据
    const user = ctx.request.body
    // console.log(user);
    // 2.将user信息存储到数据库
    const result = await userService.create(user)

    // 3.查看存储的结果，告知前端创建成功
    ctx.body = {
      code: 0,
      message: "管理员注册成功",
      data: result
    }
  }
  async sysLogin(ctx, next) {
    // 1.获取管理员传递过来的数据
    const { id, user_name, user_role, status, user_avatar } = ctx.user
    const result = {
      id,
      user_name,
      user_role,
      status,
      user_avatar
    }
    // 3.查看存储的结果，告知前端创建成功
    ctx.body = {
      code: 0,
      message: "管理员登录成功~",
      data: result
    }
  }
}

module.exports = new UserController()