const connection = require("../app/database")

class RecommendMovieService {
  async create() {
    const statement = `
      SELECT title, score, cover_url, movie_id, duration, actors, brief, director
      FROM high_movies
      WHERE CAST(score AS DECIMAL(4, 2)) > 9.0
      ;`;
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new RecommendMovieService()