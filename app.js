const koa = require('koa');
// 导入所需要的所有的第三方中间件
const bodyparser = require('koa-bodyparser');
const render = require('koa-art-template');
const static = require('koa-static');
const Router = require('koa-router');
const session = require('koa-session');
const formidable = require('koa-formidable');
const mysql = require('mysql');
const captchapng = require('captchapng2')

const path = require('path')


// 导入自定义路由中间件

const user = require('./routes/user');
const music = require('./routes/music')


const app = new koa();
const router = new Router();


// 跳转页面接口
router.get('/user/register',async(ctx,next)=>{
    ctx.render('register')
})
.get('/login',async(ctx,next)=>{
    ctx.render('login')
})
.get('/music/index',async(ctx,next)=>{
    ctx.render('index')
})
.get('/user/add',async(ctx,next)=>{
    ctx.render('add')
})
.get('/music/edit-music?id=1',async(ctx,next)=>{
    ctx.render('edit')
})


render(app,{
    // 模板路径
    root:path.join(__dirname,'views'),
    extname:'.html',
    // 开发环境配置
    debug:process.env.NODE_EVN !=='production'
})

let store = {
    myStore: {},
    get: function (key,session) {
        this.myStore[key] = session;

    },
    // destroy: function (){
    //     delete.this.myStore[key];
    // }
}
// 将第三方中间件挂到应用中间件上
app.use(bodyparser());
app.use(static(path.join(__dirname,'./public')))


// app.use(session({store},app))

app.use(user.routes(),user.allowedMethods());
app.use(music.routes(),music.allowedMethods())

app.use(router.routes(),router.allowedMethods())
app.listen(3000)