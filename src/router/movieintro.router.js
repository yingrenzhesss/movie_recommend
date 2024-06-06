const KoaRouter = require('@koa/router')
const { create, collect, cancelCollect, history, comment } = require('../controller/movieintro.controller')
const { verifyPost } = require('../middleware/login.middleware')

const movieIntroRouter = new KoaRouter({ prefix: '/movie' })

movieIntroRouter.get('/', create)
movieIntroRouter.get('/comment', comment)

movieIntroRouter.post('/collect', collect)
movieIntroRouter.post('/cancelcol', cancelCollect)
movieIntroRouter.post('/history', verifyPost, history)

module.exports = movieIntroRouter