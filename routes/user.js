const Router = require('koa-router')
const userRouter = new Router()
const userController = require('../controller/userController')


// 路由：1：提规则；2;做什么
// 验证用户是否存在
userRouter.post('/user/check-username',userController.checkUser)
// 注册
.post('/user/register',userController.doResgiter)

// 登录
.post('/user/login',userController.doLogin)

// // 登录接口
// .post('/user/do-login',async(ctx,next)=>{
//     // 1: 读数据：获取请求体中内容 

//     // 2: 从数据库中查询数据，查询的条件为客户端发过来的数据

//     // 3： 处理查询结果吧 
// })

.get('/user/get-pic',userController.getPic)

module.exports = userRouter