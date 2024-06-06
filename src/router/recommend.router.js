const KoaRouter = require('@koa/router')
const { create } = require('../controller/recommend.controller')

const recommendRouter = new KoaRouter({ prefix: '/recommend' })

recommendRouter.get('/', create)
module.exports = recommendRouter
