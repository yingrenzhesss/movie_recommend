const connection = require("../app/database")

class ExclusiveService {
  async nomal() {//默认推送
    const statement = `
      SELECT *
      FROM movies
      WHERE CAST(score AS DECIMAL(4, 2)) > 9.3;
    `;
    const [result] = await connection.execute(statement)
    return result
  }
  async getHistory(id, user_name) {//获取历史记录
    const statement = `
      SELECT * FROM movie_history WHERE user_id = ? AND user_name = ?
    `;
    const [result] = await connection.execute(statement, [id, user_name])
    return result
  }

  async findMovieById(movie_id) {//查询历史记录详细信息
    const statement = `
    SELECT m.*
    FROM(
      SELECT movie_id, title, score, cover_url, duration, types, region, actors, director,'为你推荐' AS movieType
      FROM high_movies
      UNION ALL
      SELECT movie_id, title, score, cover_url, duration, types, region, actors, director,'即将上映' AS movieType
      FROM later_movies
      UNION ALL
      SELECT movie_id, title, score, cover_url, duration, types, region, actors, director,'正在热映' AS movieType
      FROM hot_movies
      UNION ALL
      SELECT movie_id, title, score, cover_url, duration, types, region, actors, director,'分类电影' AS movieType
      FROM movies
    ) AS m
    WHERE m.movie_id = ?
    GROUP BY m.movie_id;`;
    const [result] = await connection.execute(statement, [movie_id])
    return result[0]
  }

  async findMovieByTypes(keys) {//查询类型
    const statement = `
      SELECT * FROM movies WHERE types LIKE ?
    `
    const [result] = await connection.execute(statement, [`%${keys}%`])
    return result
  }
  async findMovieBymovieId(movie_id) {//查询相似度后电影movie_id
    const statement = `
      SELECT * FROM movies WHERE movie_id = ?
    `
    const [result] = await connection.execute(statement, [movie_id])
    return result
  }
}

module.exports = new ExclusiveService()