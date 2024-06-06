const KoaRouter = require('@koa/router')
const { create, sysLogin } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { verifySysLogin } = require('../middleware/login.middleware');

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: '/sys' })

// 2.定义路由中间映射
// 2.1.管理员注册登录接口
userRouter.post('/register', verifyUser, handlePassword, create)
userRouter.post('/login', verifySysLogin, sysLogin)
// 3.导出路由对象
module.exports = userRouter