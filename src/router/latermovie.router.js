const KoaRouter = require('@koa/router')
const { create } = require('../controller/latermovie.controller')

const laterMovieRouter = new KoaRouter({ prefix: '/latermovie' })

laterMovieRouter.get('/', create)

module.exports = laterMovieRouter  