const KoaRouter = require('@koa/router')
const { create } = require('../controller/categories.controller')

const categoriesRouter = new KoaRouter({ prefix: '/categories' })

categoriesRouter.get('/', create)

module.exports = categoriesRouter