const KoaRouter = require('@koa/router')
const { create } = require('../controller/hotmovie.controller')

const hotMovieRouter = new KoaRouter({ prefix: '/hotmovie' })

hotMovieRouter.get('/', create)

module.exports = hotMovieRouter
