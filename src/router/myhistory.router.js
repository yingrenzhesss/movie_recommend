const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create } = require('../controller/myhistory.controller')

const myHistoryRouter = new KoaRouter({ prefix: '/myhistory' })

myHistoryRouter.get('/', verifyAuth, create)

module.exports = myHistoryRouter