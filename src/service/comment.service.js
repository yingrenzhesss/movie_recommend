const connection = require("../app/database")

class CommentService {
  async create(user_name, movie_name, movie_id, user_id, rating, content) {
    const statement = `
      INSERT INTO movie_reviews(user_name, movie_name, movie_id, user_id, rating, content) VALUES(?, ?, ?, ?, ?, ?);
    `;
    const [result] = await connection.execute(statement, [user_name, movie_name, movie_id, user_id, rating, content])
    return result
  }
}

module.exports = new CommentService()