// 主路由；路由分支
const Router = require('koa-router')
const router = new Router()
const userController = require('./controller/userController')
const musicController = require('./controller/musicController')

router.get('/user/register',userController.showRegister)
.get('/user/login',userController.showLogin)
.get('/music/index',musicController.showIndex)
.get('/music/add',musicController.showAdd)
.get('/music/edit-music?id=1',async(ctx,next)=>{
    ctx.render('edit')
})




module.exports = router;

