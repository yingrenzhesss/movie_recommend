const connection = require("../app/database")

class MyCommentService {
  async create(user_id, user_name) {
    const statement = `
      SELECT *
      FROM movie_reviews
      WHERE user_id = ? AND user_name = ?
    `;
    const [result] = await connection.execute(statement, [user_id, user_name])
    return result
  }
  async delete(user_id, user_name, create_at) {
    const statement = `DELETE FROM movie_reviews WHERE user_id =? AND user_name =? AND create_at = ?`;
    const [result] = await connection.execute(statement, [user_id, user_name, create_at])
    return result
  }
}

module.exports = new MyCommentService()