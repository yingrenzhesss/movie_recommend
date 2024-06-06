const KoaRouter = require('@koa/router')
const { verifyAuth, verifyPost } = require('../middleware/login.middleware')
const { create, delect } = require('../controller/mycomment.controller')

const myCommentRouter = new KoaRouter({ prefix: '/mycomment' })

myCommentRouter.get('/', verifyAuth, create)
myCommentRouter.post('/delect', verifyPost, delect)

module.exports = myCommentRouter