// var mysql = require('mysql');

// const db = {};
// // 创建一个连接池
// var mysql = require('mysql');
// var pool  = mysql.createPool({
//   connectionLimit : 10,
//   host            : 'localhost',
//   user            : 'root',
//   password        : 'password',
//   port            : '3306',
//   database        : 'mymusic'
// });
// var sql = 'SELECT *from jinlovo where id>10;'
//  // query () 通过连接池去操作数据库
// pool.query(sql, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });





// // 获取连接池
// pool.getConnection(function(err, connection) {
//     if (err) throw err; 
// // 操作数据库
//     connection.query('SELECT *from jinlovo where id>10;', function (error, results, fields) {
//         // 抛出连接
//       connection.release();
   
    
     
   
     
//     });
//   });


//   db.p = function (sql,parm,callback) {
//       db.p('')
//   }
//   module.exports = db;

// * 这里写操作数据库的代码
// * */
const mysql = require('mysql');

// 创建一个连接池c
const pool = mysql.createPool({
   connectionLimit: 10,
   host: 'localhost',
   user: 'root',
   password: '123456',
   database: 'mymusic'
});
const db = {}
db.p = function (sql, parm, callback) {
   //—> 1 取出链接   callback 接收外部处理函数
   pool.getConnection(function (err, connection) {
       if (err) {
           callback(err); // 链接失败处理
           return
       }
       // ——:> 2:操作数据库 （通过链接池操作的）
       connection.query(sql, parm, function (error, results, fields) {
           //  与 sql语句有关的错误  查看 sql
           console.log(`${sql}=>${parm}`);
           //——>  3: 释放链接
           connection.release();
           //——> 4: 将操作结果交给外部处理函数
           callback(error,results)
       });
   });
}

module.exports = db
