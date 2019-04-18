const db = require('./db')
module.exports = {
    findByName: async()=>{
        let dataArr = await db.p('select * from nihao where name=?',['yanqi'])
        return dataArr
    }
}


