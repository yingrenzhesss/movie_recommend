const KoaRouter = require('@koa/router')
const { create } = require('../controller/banners.controller')

const bannersRouter = new KoaRouter({ prefix: '/banners' })

bannersRouter.get('/', create)

module.exports = bannersRouter