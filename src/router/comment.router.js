const KoaRouter = require('@koa/router')
const { create } = require('../controller/comment.controller')

const commentRouter = new KoaRouter({ prefix: '/comment' })

commentRouter.post('/', create)

module.exports = commentRouter