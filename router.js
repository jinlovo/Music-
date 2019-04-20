// 主路由；路由分支
const Router = require('koa-router')
const router = new Router()
const userController = require('./controller/userController')
const musicController = require('./controller/musicController')

router.get('/user/register',userController.showRegister)
.get('/user/login',userController.showLogin)
.get('/music/index',musicController.showIndex)
.get('/music/add',musicController.showAdd)
<<<<<<< HEAD
.get('/music/edit-music',async(ctx,next)=>{
=======
.get('/music/edit-music?id=1',async(ctx,next)=>{
>>>>>>> 44d63a679cfd64662c40362065041d0118b9d1f7
    console.log('11111111')
    ctx.render('edit')
})
module.exports = router;

