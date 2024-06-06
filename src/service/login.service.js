const connection = require("../app/database")

class LoginService {
  async findByOpenId(cryptoOpenid) {
    const statement = 'SELECT * FROM `user` WHERE user_openid = ?;';
    const [result] = await connection.execute(statement, [cryptoOpenid])
    // console.log('service===', result);
    return result
  }

  async save(user_name, user_openid, user_role, status, user_avatar) {
    const statement = 'INSERT INTO  `user` (user_name, user_openid, user_role, status,user_avatar) values(?, ?, ?, ?, ?);';
    const [result] = await connection.execute(statement, [user_name, user_openid, user_role, status, user_avatar])
    return result
  }
}

module.exports = new LoginService()
