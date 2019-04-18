const koa = require('koa')
// 导入所需要的所有的第三方中间件 
const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')
const path = require('path')
const static = require('koa-static')
const session = require('koa-session')
const formidable = require('koa-formidable')
const captchapng = require('captchapng2')

// 导入自定义路由中间件
const router = require('./router')
const userRouter = require('./routes/user')
const musicRouter = require('./routes/music')

const app = new koa()



render(app,{
    // 模板路径
    root: path.join(__dirname, 'views'),
    // 模板后缀名字
    extname: '.html',
    //  开发环境配置
    debug: process.env.NODE_ENV !== 'production'
})
app.keys = ['jjjjdfhdfdkffk']
let store = {
    myStore: {},
    get: function (key) {
        return this.myStore[key];
    },
    set: function (key, session) {
        this.myStore[key] = session;
    },
    destroy: function () {
        delete this.myStore[key];
    }
}
// 将第三方中间件挂在到应用中间件上 
app.use(bodyparser())
app.use(static(path.join(__dirname),'./public'))
// 没有写session 配置信息 
app.use(session({store},app))
app.use(router.routes(),router.allowedMethods())
app.use(userRouter.routes(),userRouter.allowedMethods())
app.use(musicRouter.routes(),musicRouter.allowedMethods())
app.listen(3000)