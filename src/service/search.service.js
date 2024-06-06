const connection = require("../app/database")

class SearchService {
  async create(value) {
    const statement = `
    SELECT m.movie_id, m.title,m.score,m.cover_url, m.actors, m.release_date, m.movieType, m.director
    FROM(
      SELECT movie_id, title, score, cover_url, actors, release_date, director,'为你推荐' AS movieType
      FROM high_movies
      UNION ALL
      SELECT movie_id, title, score, cover_url, actors, release_date, director,'即将上映' AS movieType
      FROM later_movies
      UNION ALL
      SELECT movie_id, title, score, cover_url, actors, release_date, director,'正在热映' AS movieType
      FROM hot_movies
      UNION ALL
      SELECT movie_id, title, score, cover_url, actors, release_date, director,'分类电影' AS movieType
      FROM movies
    ) AS m
    WHERE m.title LIKE "%${value}%"
    GROUP BY m.movie_id;`;
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new SearchService()