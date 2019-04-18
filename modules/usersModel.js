const db = require('./db')
module.exports = {
    findUserByUsername: async (username) => {
        // 用请求参数username 作为查询条件
        let result = await db.p('select * from users where username=?', [username])
        return result
    },
    findUserByUE: async (username, email) => {
        let result = await db.p('select 1 from users where username=? or email=?', [username, email])
        return result
    },
    // ... user 可变参数 可以就收多个实参 返回时 user数组；user数组中放 多个实参
    resgiterUser: async (...user) => {
        let result = await db.p('insert into users (username,password,email) values(?,?,?)', user)
        return result
    }
}