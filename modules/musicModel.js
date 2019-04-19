const db = require('./db')

module.exports = {
    addMusic: async musics=> await db.p('insert into musics (title,singer,time,filelrc,file,uid) values(?,?,?,?,?,?)',Object.values(musics)),

    updataMusic: async opts=> await db.p('update musics set title=? singer=?,time=?,file=?,filelrc=?,uid=?  where id=? ',Object.values(opts)),
  
    deleteMusic: async id => await db.p('delete from musics where id=? ',[id])
    
}
