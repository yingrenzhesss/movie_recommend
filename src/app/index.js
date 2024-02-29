const Koa = require('koa')
const userRouter = require('../router/user.router')
const bodyParser = require('koa-bodyparser')

// 1.创建服务器
const app = new Koa()
1
// 2.app使用中间件
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

// 3.导出app
module.exports = app