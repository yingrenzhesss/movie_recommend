const connection = require("../app/database")

class SysService {
  // 用户处理
  async userSearch(value) {
    const statement = `
      SELECT * FROM user WHERE user_name LIKE ? OR user_role LIKE ?
    `;
    const [result] = await connection.execute(statement, [`%${value}%`, `%${value}%`]);
    return result;
  }
  async userDelete(id, name) {
    const statement = `DELETE FROM user WHERE id =? AND user_name =?`;
    const [result] = await connection.execute(statement, [id, name]);
    return result;
  }
  // 电影处理
  async movieSearch(value) {
    const statement = `
      SELECT m.movie_id, m.title,m.score,m.cover_url, m.actors, m.release_date, m.movieType, m.director, m.duration, m.types, m.region, m.movie_url, m.description
      FROM(
        SELECT movie_id, title, score, cover_url, duration, types, region, movie_url, description, actors, release_date, director,'为你推荐' AS movieType
        FROM high_movies
        UNION ALL
        SELECT movie_id, title, score, cover_url, duration, types, region, movie_url, description, actors, release_date, director,'即将上映' AS movieType
        FROM later_movies
        UNION ALL
        SELECT movie_id, title, score, cover_url, duration, types, region, movie_url, description, actors, release_date, director,'正在热映' AS movieType
        FROM hot_movies
        UNION ALL
        SELECT movie_id, title, score, cover_url, duration, types, region, movie_url, description, actors, release_date, director,'分类电影' AS movieType
        FROM movies
      ) AS m
      WHERE m.title LIKE ? OR m.movie_id LIKE ?  OR m.score LIKE ? OR m.actors LIKE ?  OR m.director LIKE ?
      GROUP BY m.movie_id;
    `
    const [result] = await connection.execute(statement, [`%${value}%`, `%${value}%`, `%${value}%`, `%${value}%`, `%${value}%`]);
    return result
  }
  async movieDelete(movie_id, title) {
    const statement1 = `
      DELETE FROM hot_movies
      WHERE movie_id = ? AND title = ?;
    `;
    const statement2 = `
      DELETE FROM later_movies
      WHERE movie_id = ? AND title = ?;
    `;
    const statement3 = `
      DELETE FROM high_movies
      WHERE movie_id = ? AND title = ?;
    `;
    const statement4 = `
      DELETE FROM movies
      WHERE movie_id = ? AND title = ?;
    `;
    const [result1] = await connection.execute(statement1, [movie_id, title]);
    const [result2] = await connection.execute(statement2, [movie_id, title]);
    const [result3] = await connection.execute(statement3, [movie_id, title]);
    const [result4] = await connection.execute(statement4, [movie_id, title]);

    const result = [result1, result2, result3, result4]
    return result;
  }
  async movieUpdate(movie_id, title, score, duration, director, types, region, description, movieId) {
    const statement1 = `
      UPDATE hot_movies
      SET
        movie_id = ?,
        title = ?,
        score = ?,
        duration = ?,
        director = ?,
        types = ?,
        region = ?,
        description = ?
      WHERE movie_id = ?;
    `;
    const statement2 = `
      UPDATE high_movies
      SET
        movie_id = ?,
        title = ?,
        score = ?,
        duration = ?,
        director = ?,
        types = ?,
        region = ?,
        description = ?
      WHERE movie_id = ?;
    `;
    const statement3 = `
      UPDATE later_movies
      SET
        movie_id = ?,
        title = ?,
        score = ?,
        duration = ?,
        director = ?,
        types = ?,
        region = ?,
        description = ?
      WHERE movie_id = ?;
    `;
    const statement4 = `
      UPDATE movies
      SET
        movie_id = ?,
        title = ?,
        score = ?,
        duration = ?,
        director = ?,
        types = ?,
        region = ?,
        description = ?
      WHERE movie_id = ?;
    `;
    const [result1] = await connection.execute(statement1, [movie_id, title, score, duration, director, types, region, description, movieId]);
    const [result2] = await connection.execute(statement2, [movie_id, title, score, duration, director, types, region, description, movieId]);
    const [result3] = await connection.execute(statement3, [movie_id, title, score, duration, director, types, region, description, movieId]);
    const [result4] = await connection.execute(statement4, [movie_id, title, score, duration, director, types, region, description, movieId]);

    const result = [result1, result2, result3, result4]
    return result;
  }

  // 评论处理
  async commentSearch(value) {
    const statement = `
      SELECT *
      FROM movie_reviews
      WHERE movie_name LIKE ? OR movie_id LIKE ?  OR user_name LIKE ? OR rating LIKE ?  OR content LIKE ?
    `
    const [result] = await connection.execute(statement, [`%${value}%`, `%${value}%`, `%${value}%`, `%${value}%`, `%${value}%`]);
    return result
  }
  async commentDelete(id, name, movie_id) {
    const statement1 = `
      DELETE FROM movie_reviews
      WHERE id = ? AND user_name = ? AND movie_id = ? ;
    `;
    const [result] = await connection.execute(statement1, [id, name, movie_id]);
    return result;
  }
  // 轮播图
  async bannersSearch() {
    const statement = 'SELECT * FROM banners;';
    const [result] = await connection.execute(statement)
    // console.log(result);
    return result
  }
  async bannersDelete(movie_id, movie_name) {
    const statement = `DELETE FROM banners WHERE movie_id =? AND movie_name =?`;
    const [result] = await connection.execute(statement, [movie_id, movie_name]);
    return result
  }
  async bannerInsert(movie_id, movie_name, movie_img) {
    const statement = `INSERT INTO banners (movie_id, movie_name, movie_img) VALUES(?, ?, ?)`;
    const [result] = await connection.execute(statement, [movie_id, movie_name, movie_img]);
    return result
  }

  // 个人中心
  async systemSearch(user_name) {
    const statement = 'SELECT id, user_name, user_role, status, user_avatar FROM user WHERE user_name = ?';
    const [result] = await connection.execute(statement, [user_name])
    // console.log(result);
    return result
  }
  async systemUpdate(user_name, status, user_role, user_avatar, userName) {//管理员信息修改
    const statement1 = `
      UPDATE user
      SET
        user_name = ?,
        status = ?,
        user_role = ?,
        user_avatar = ?
      WHERE user_name = ?;
    `;
    const [result] = await connection.execute(statement1, [user_name, status, user_role, user_avatar, userName]);
    return result;
  }
  async oldSecretSearch(user_name) {//查询用户密码
    const statement = `
      SELECT user_openid FROM user WHERE user_name = ?
    `;
    const [result] = await connection.execute(statement, [user_name]);
    return result[0];
  }
  async systemSecretUpdate(user_name, recentSecret) {//改密码
    const statement = `
      UPDATE user SET user_openid = ? WHERE user_name = ?;
    `;
    const [result] = await connection.execute(statement, [recentSecret, user_name]);
    return result;
  }
}

module.exports = new SysService()