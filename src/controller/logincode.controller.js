const jwt = require('jsonwebtoken')

class LoginCodeController {
  // 颁发令牌
  async sign(ctx, next) {
    // 1.获取用户信息
    const user = ctx.user
    const { user_name, user_openid, user_role } = user
    const payload = { user_name, user_openid, user_role }

    // 2.颁发token
    const secret = "this is a secret key"
    ctx.secret = secret
    const token = jwt.sign(payload, secret, {
      expiresIn: 24 * 60 * 60 //一天过期
    })
    // 3.返回前端token
    ctx.body = { code: 0, data: { user, token } }
  }

  test(ctx, next) {
    ctx.body = "验证身份通过~"
  }
}


module.exports = new LoginCodeController()