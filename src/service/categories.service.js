const connection = require("../app/database")

class CategoriesService {
  async create(title, offset = 0, limit = 10) {
    const statement = `
      SELECT * FROM movies
      WHERE types LIKE ?
      LIMIT ? OFFSET ?;
    `;
    const [result] = await connection.execute(statement, [`%${title}%`, String(limit), String(offset)])
    return result
  }
}

module.exports = new CategoriesService()