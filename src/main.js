const { SERVER_PORT } = require('./config/server')
const app = require('./app')
require('./utils/handle-error')

// 监听项目
app.listen(SERVER_PORT, () => {
  console.log('电影小程序项目启动成功~');
})