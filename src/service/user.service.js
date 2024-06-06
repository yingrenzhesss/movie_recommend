const connection = require('../app/database')

class UserService {
  async create(user) { //传入user
    // 1.获取用户user
    const { name, password } = user
    const user_role = "管理员"
    const status = 2
    const user_avatar = "https://img.duoziwang.com/2019/08/12181502586470.jpg"

    // 2.拼接statement
    const statement = 'INSERT INTO `user` (user_name, user_openid, user_role, status, user_avatar) VALUES (?, ?, ?, ?, ?);';

    // 3.执行sql语句
    const [result] = await connection.execute(statement, [name, password, user_role, status, user_avatar]);
    return result
  }

  async findUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE user_name = ?;'
    const [values] = await connection.execute(statement, [name])
    return values
  }
}

module.exports = new UserService()