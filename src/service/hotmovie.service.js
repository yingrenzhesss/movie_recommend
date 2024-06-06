const connection = require("../app/database")

class hotMovieService {
  async create(offset, limit) {
    const statement = `
      SELECT title, score, cover_url, movie_id, duration, actors 
      FROM hot_movies
      LIMIT ? OFFSET ?; `;
    const [result] = await connection.execute(statement, [String(limit), String(offset)])
    return result
  }
}

module.exports = new hotMovieService()