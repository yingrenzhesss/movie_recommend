const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')
// 导入路由
// const userRouter = require('../router/user.router')
// const loginRouter = require('../router/login.router')

// 1.创建服务器
const app = new Koa()
// 2.app使用中间件
app.use(bodyParser())

// 路由引用
registerRouters(app)
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())

// 3.导出app
module.exports = app