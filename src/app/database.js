const mysql = require('mysql2')

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'yingrenzhehub',
  user: 'root',
  password: '123456',
  connectionLimit: 5
})
// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    // 1.判断是否右错误信息
    console.log('获取连接失败~', err);
    return
  }

  // 2.获取connection，尝试和数据库建立一下连接
  connection.connect(err => {
    if (err) {
      console.log('和数据库交互失败', err);
    } else {
      console.log('和数据库交互成功，可以进行操作~');
    }
  })
})

// 3.获取连接池中的连接对象（Promise）
const connection = connectionPool.promise()
module.exports = connection