const KoaRouter = require('@koa/router')
const { sign, test } = require('../controller/logincode.controller')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')

// 1.获得前端给的code
const logincodeRouter = new KoaRouter({ prefix: '/logincode' })

logincodeRouter.post('/', verifyLogin, sign)
logincodeRouter.get('/test', verifyAuth, test)


module.exports = logincodeRouter
