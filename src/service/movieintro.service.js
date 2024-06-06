const connection = require("../app/database")

class MovieIntroService {
  // 4种电影信息
  async hotMovie(movie_id) {
    const statement = `
      SELECT h.*,
      (
        JSON_ARRAYAGG(
          JSON_OBJECT('actor_name', a.actor_name, 'actor_avatar', a.actor_avatar)
          )
      ) actors
      FROM hot_movies h
      LEFT JOIN actors a ON h.movie_id = a.movie_id
      WHERE h.movie_id = ?;`;
    const [result] = await connection.execute(statement, [movie_id])
    return result
  }
  async laterMovie(movie_id) {
    const statement = `
      SELECT l.*,
      (
        JSON_ARRAYAGG(
          JSON_OBJECT('actor_name', a.actor_name, 'actor_avatar', a.actor_avatar)
          )
      ) actors
      FROM later_movies l
      LEFT JOIN actors a ON l.movie_id = a.movie_id
      WHERE l.movie_id = ?;`;
    const [result] = await connection.execute(statement, [movie_id])
    return result
  }
  async recommendMovie(movie_id) {
    const statement = `
      SELECT h.*,
      (
        JSON_ARRAYAGG(
          JSON_OBJECT('actor_name', a.actor_name, 'actor_avatar', a.actor_avatar)
          )
      ) actors
      FROM high_movies h
      LEFT JOIN actors a ON h.movie_id = a.movie_id
      WHERE h.movie_id = ?;`;
    const [result] = await connection.execute(statement, [movie_id])
    return result
  }
  async categoriesMovie(movie_id) {
    const statement = `
      SELECT h.*,
      (
        JSON_ARRAYAGG(
          JSON_OBJECT('actor_name', a.actor_name, 'actor_avatar', a.actor_avatar)
          )
      ) actors
      FROM movies h
      LEFT JOIN actors a ON h.movie_id = a.movie_id
      WHERE h.movie_id = ?;`;
    const [result] = await connection.execute(statement, [movie_id])
    return result
  }

  // 收藏-记录
  async comment(movie_id) {//电影评论信息
    const statement = `SELECT * FROM movie_reviews WHERE movie_id = ? ;`
    const [result] = await connection.execute(statement, [movie_id])
    return result
  }
  async collect(movie_id, movie_name, user_id, user_name, movieType) {//收藏
    const statement = `INSERT INTO movie_collect (movie_id, movie_name, user_id, user_name, movieType) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [movie_id, movie_name, user_id, user_name, movieType])
    return result
  }

  async cancelCollect(movie_id, user_id) {//取消收藏
    const statement = `DELETE FROM movie_collect WHERE movie_id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [movie_id, user_id])
    return result
  }

  async history(movie_id, movie_name, user_id, user_name, movieType) {//历史记录
    const statement = `INSERT INTO movie_history (movie_id, movie_name, user_id, user_name, movieType) VALUES (?, ?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [movie_id, movie_name, user_id, user_name, movieType])
    return result
  }

  async isCollect(movie_id, user_id) {//查看收藏记录
    const statement = `SELECT * FROM movie_collect WHERE movie_id = ?  and user_id = ?;`
    const [result] = await connection.execute(statement, [movie_id, user_id])
    return !!result.length //返回boolean类型
  }
}

module.exports = new MovieIntroService()