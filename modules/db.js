/** 
 *  操作数据数据模块
 * */

const mysql = require('mysql');
// 创建一个连接池c
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mymusic'
});
const db = {}
db.p = function (sql, parm) {
    return new Promise(function (resolve,reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
                return
            }
         
            connection.query(sql, parm, function (error, results, fields) {
                console.log(`${sql}=>${parm}`);
                connection.release();
                if(error){
                    reject(error)
                    return
                }
                
                resolve(results)
            });
        });
    })
}

module.exports = db