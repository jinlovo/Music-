module.exports = {
    showIndex:async(ctx,next)=>{
        ctx.render('index')
    },
    showAdd: async(ctx,next)=>{
        ctx.render('add')
    }
}