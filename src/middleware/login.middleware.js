const {
  OPENID_IS_REQUIRED,
  UNAUTHORIZATION,
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  MUST_BE_A_SYSTEM,
} = require("../config/error")

const jwt = require('jsonwebtoken')
const axios = require('axios')
const md5openid = require("../utils/md5-crypto")

const loginService = require('../service/login.service')
const userService = require("../service/user.service")


const verifyLogin = async (ctx, next) => {
  // 1.设置默认数据
  const { code, user_avatar, user_name, user_role } = ctx.request.body
  const status = 1 //0是未登录,1是已登录

  const appid = "wx9bd47a793d8f5461"
  const secret = 'a544e95ce4b7299955a6925124cbad85'
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`

  // 2.判断用户openid和头像或名字
  if (!code || !user_avatar || !user_name) {
    return ctx.app.emit('error', OPENID_IS_REQUIRED, ctx)
  }

  // 3.向微信官方请求openid
  try {
    // 请求openid
    const result = await axios.get(url)
    const { openid } = result.data
    // console.log(openid);
    // 4.保存用户
    // 4.1加密openid
    if (openid) {
      const newOpenid = md5openid(openid)
      // 4.2.将用户存储到数据库中
      // 用户是否已存在
      const users = await loginService.findByOpenId(newOpenid)
      const user = users[0] //对象类型
      if (!users.length) {
        const saveResult = await loginService.save(user_name, newOpenid, user_role, status, user_avatar)
        console.log("用户登录并创建成功~");
        const users = await loginService.findByOpenId(newOpenid)
        ctx.user = users[0]

      } else {
        // 5.将user保存至ctx,方便使用
        ctx.user = user
      }
    }
    // 执行下一个中间件
    await next()

  } catch (error) {
    console.log(error);
    ctx.body = "error,用户无法登录~"
  }

}
//处理get类型
const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const { user_token } = ctx.query
  // console.log(user_token);
  if (!user_token) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = user_token

  // 2.验证token是否有效
  try {
    // 2.1 验证token中的信息
    // const secret = ctx.secret
    const secret = "this is a secret key"
    const result = jwt.verify(token, secret)
    // console.log(result);
    // 2.2将token中的数据保存至user{}
    ctx.user = result
    const { user_openid } = result
    const user = await loginService.findByOpenId(user_openid)
    ctx.user = user[0]
    // console.log(ctx.user);
    // 3.执行下一个中间件
    await next()

  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}
//处理post类型
const verifyPost = async (ctx, next) => {
  // 1.获取token
  const { user_token } = ctx.request.body
  // console.log(user_token);
  if (!user_token) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = user_token

  // 2.验证token是否有效
  try {
    // 2.1 验证token中的信息
    // const secret = ctx.secret
    const secret = "this is a secret key"
    const result = jwt.verify(token, secret)
    // console.log(result);
    // 2.2将token中的数据保存至user{}
    ctx.user = result
    const { user_openid } = result
    const user = await loginService.findByOpenId(user_openid)
    ctx.user = user[0]

    // 3.执行下一个中间件
    await next()

  } catch (error) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
}

// 处理管理员登录
const verifySysLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body

  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2.查询该用户是否在数据库中存在
  const users = await userService.findUserByName(name)
  const user = users[0] //对象类型
  if (!user) {
    return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
  }

  // 3.查询数据库中的密码和用户传递的密码是否一致
  if (user.user_openid !== md5openid(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }
  if (user.user_role !== '管理员') {
    return ctx.app.emit('error', MUST_BE_A_SYSTEM, ctx)
  }
  // 4.将user保存在ctx里，方便传递给别人
  ctx.user = user

  // 执行下一个中间件
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPost,
  verifySysLogin
}