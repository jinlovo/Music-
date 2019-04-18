module.exports = {
    showIndex:async(ctx,next)=>{
        ctx.render('index')
    },
    showAdd: async(ctx,next)=>{
        ctx.render('add')
    },
    async addMusic(ctx,next){
        // 接收请求参数
       

    }
}