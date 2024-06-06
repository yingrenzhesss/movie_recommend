const fs = require('fs')
const path = require('path')

// 默认情况下相对目录与node程序的启动目录有关
// const PRIVATE_KEY = fs.readFileSync('./src/config/keys/private.key')
// const PUBLICE_KEY = fs.readFileSync('./src/config/keys/public.key')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

// module.exports = {
//   PRIVATE_KEY,
//   PUBLICE_KEY
// }
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;