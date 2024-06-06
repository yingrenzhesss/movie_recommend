const crypto = require('crypto')

// md5加密信息
function md5crypto(message) {
  const md5 = crypto.createHash('md5')
  const md5crypto = md5.update(message).digest('hex')

  return md5crypto
}


module.exports = md5crypto