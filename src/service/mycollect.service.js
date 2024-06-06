const connection = require("../app/database")

class MyCollectService {
  async create(id, user_name) {
    const statement = `
      SELECT m.movie_id, m.title,m.score,m.cover_url,m.movieType, m.director, m.actors, m.release_date
      FROM movie_collect c
      JOIN (
        SELECT movie_id, title, score, cover_url, director, actors, release_date,'为你推荐' AS movieType
        FROM high_movies
        UNION ALL
        SELECT movie_id, title, score, cover_url, director, actors, release_date,'即将上映' AS movieType
        FROM later_movies
        UNION ALL
        SELECT movie_id, title, score, cover_url, director, actors, release_date,'正在热映' AS movieType
        FROM hot_movies
        UNION ALL
        SELECT movie_id, title, score, cover_url, director, actors, release_date,'分类电影' AS movieType
        FROM movies
      ) AS m ON c.movie_id = m.movie_id
      WHERE c.user_id = ? AND c.user_name =?;
    `;
    const [result] = await connection.execute(statement, [id, user_name])
    return result
  }
}

module.exports = new MyCollectService