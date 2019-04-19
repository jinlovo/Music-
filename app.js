
const koa = require('koa')
// 导入所需要的所有的第三方中间件 
// const bodyparser = require('koa-bodyparser')
const render = require('koa-art-template')
const static = require('koa-static')
const session = require('koa-session')
const formidable = require('koa-formidable')
const captchapng = require('captchapng2')
const config = require('./routes/config')


// 导入自定义路由中间件
const routers = require('./router')
const userRouter = require('./routes/user')
const musicRouter = require('./routes/music')

const app = new koa()

render(app,{
    // 模板路径
    root: config.renderRoot,
    // 模板后缀名字
    extname: '.html',
    //  开发环境配置
    debug: process.env.NODE_ENV !== 'production'
})
app.keys = ['text']
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

// 优雅的异常处理  ?????
app.use(async (ctx,next)=>{
    try{
        // 先放行
        await next()
    } catch(e){
        console.log(e)
        ctx.render('error',{msg:'出错误了快回去看看吧'})
    }
})



// 重写/user/login 的url 
app.use(async(ctx,next)=>{
    if(ctx.url==='/'){
        ctx.url = '/user/login'
    }
    // 重写url 完成后；放行
    await next()
})

// 将第三方中间件挂在到应用中间件上 
// app.use(bodyparser())
app.use(static(config.staticBase),config.staticDir)
// 没有写session 配置信息 
app.use(session({store},app))
app.use(formidable({
    // 设置一上传文件路径，默认路径为temp目录下
    uploadDir:config.uploadDir,
    // 默认根据文件算法生成hash 字符串（文件名字），无后缀 ，所以我们需要保存文件后缀
    keepExtensions:true
}))
app.use(userRouter.routes(),userRouter.allowedMethods())
app.use(musicRouter.routes(),musicRouter.allowedMethods())
app.use(routers.routes(),routers.allowedMethods())

app.listen(config.host)
