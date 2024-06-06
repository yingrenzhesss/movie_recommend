const connection = require("../app/database")

class laterMovieService {
  async create(offset, limit) {
    const statement = `
      SELECT title, score, cover_url, movie_id, duration, release_date, actors
      FROM later_movies
      LIMIT ? OFFSET ?;`;
    const [result] = await connection.execute(statement, [String(limit), String(offset)])
    return result
  }
}

module.exports = new laterMovieService()