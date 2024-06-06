const KoaRouter = require('@koa/router')
const { create } = require('../controller/search.controller')

const searchRouter = new KoaRouter({ prefix: '/search' })

searchRouter.get('/', create)

module.exports = searchRouter