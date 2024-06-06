const app = require('../app')
const { NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,

  OPENID_IS_REQUIRED,
  MUST_BE_A_SYSTEM,
  TWO_PASSWORD_DO_NOT_MATCH
} = require('../config/error')

app.on('error', (error, ctx) => {
  let code = 0
  let message = ''

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空~'
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = '用户名已存在,请输入新的用户名'
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = '用户名不存在,请检查你的用户名'
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = '输入的密码错误,请检查你的密码~'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '无效的token或者token已过期~'
      break
    case OPENID_IS_REQUIRED:
      code = -1006
      message = '无法获得openid~'
      break
    case MUST_BE_A_SYSTEM:
      code = -1007
      message = '登录用户需要是管理员身份~'
      break
    case TWO_PASSWORD_DO_NOT_MATCH:
      code = -1008
      message = '两个新密码不一致~'
      break
  }

  ctx.body = { code, message }
})