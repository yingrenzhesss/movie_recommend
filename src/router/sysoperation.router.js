const KoaRouter = require('@koa/router')
const {
  userSearch,
  userDelete,
  movieSearch,
  movieDelete,
  bannerSearch,
  bannerDelete,
  movieUpdate,
  systemSearch,
  systemUpdate,
  commentSearch,
  commentDelete,
  bannerInsert,
  systemSecretUpdate
} = require('../controller/sysoperation.controller')

const sysRouter = new KoaRouter({ prefix: '/sys' })
//管理员操作用户
sysRouter.get('/users', userSearch)
sysRouter.post('/users/delete', userDelete)

// 管理员操作电影
sysRouter.get('/movie', movieSearch)
sysRouter.post('/movie/delete', movieDelete)
sysRouter.post('/movie/update', movieUpdate)

// 管理员操作评论
sysRouter.get('/comment', commentSearch)
sysRouter.post('/comment/delete', commentDelete)

// 管理轮播图
sysRouter.get('/banners', bannerSearch)
sysRouter.post('/banners/delete', bannerDelete)
sysRouter.post('/banners/insert', bannerInsert)

// 个人中心操作
sysRouter.get('/system', systemSearch)
sysRouter.post('/info/update', systemUpdate)
sysRouter.post('/secret/update', systemSecretUpdate)

module.exports = sysRouter