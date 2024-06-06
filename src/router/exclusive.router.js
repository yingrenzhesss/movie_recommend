const KoaRouter = require('@koa/router')
const { create, nomal } = require('../controller/exclusive.controller')
const { verifyAuth } = require('../middleware/login.middleware')

const exclusiveRouter = new KoaRouter({ prefix: '/exclusive' })

exclusiveRouter.get('/nomal', nomal)
exclusiveRouter.get('/', verifyAuth, create)

module.exports = exclusiveRouter