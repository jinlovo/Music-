// 处理的post 请求
const Router = require('koa-router')
const musicRouter =  new Router()
const musicControllre = require('../controller/musicController')


musicRouter.post('/music/add',musicControllre.addMusic)
.put('/api/update-music',musicControllre.updateMusic)
.delete('/api/del-music',musicControllre.deleteMusic)

module.exports = musicRouter;