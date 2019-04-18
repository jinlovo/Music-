// 处理的post 请求
const Router = require('koa-router')
const router =  new Router()

.get('/music/index',async(ctx,next)=>{
    ctx.render('index')
})
.get('/music/add',async(ctx,next)=>{
    ctx.render('add')
})
.get('/music/edit-music?id=1',async(ctx,next)=>{
    ctx.render('edit')
})



module.exports = router;