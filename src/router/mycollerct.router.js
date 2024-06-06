const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create } = require('../controller/mycollect.controller')

const myCollectRouter = new KoaRouter({ prefix: '/mycollect' })

myCollectRouter.get('/', verifyAuth, create)

module.exports = myCollectRouter