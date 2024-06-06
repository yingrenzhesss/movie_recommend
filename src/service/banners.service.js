const connection = require("../app/database")

class BnnersService {
  async create() {
    const statement = 'SELECT * FROM banners;'; 
    const [result] = await connection.execute(statement)
    // console.log(result);
    return result
  }
}

module.exports = new BnnersService()