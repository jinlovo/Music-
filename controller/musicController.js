const path = require('path')
const musicModel = require('../modules/musicModel')
function optUpload(ctx){
    let {
        title,
        singer,
        time,   

    } = ctx.request.body;
    let saveSingObj = {
        title,
        singer,
        time
    }
    console.log(saveSingObj)

    // 2: 获取文件对象--> 保存文件的网络路径（方便/public请求返回）
    // 保存文件绝对路径也可以，就是麻烦
    let {
        file,
        filelrc
    } = ctx.request.files;
    // 2.5 歌词可选（可有可无）
    if (filelrc) {
        saveSingObj.filelrc = '/public/files/' + path.parse(filelrc.path).base
    }
    // 2.6 处理没有文件情况
    if (!file) {
        ctx.throw('歌曲必须上传');
        return
    }
    // 2.7处理文件路径
    saveSingObj.file = '/public/files/' + path.parse(file.path).base
//  添加用户身份 uid ???
    saveSingObj.uid = 1
return saveSingObj;
}
module.exports = {
    showIndex: async (ctx, next) => {
        ctx.render('index')
    },
    showAdd: async (ctx, next) => {
        ctx.render('add')
    },
    async addMusic(ctx, next) {

        // 1：获取字符串数据
       
        //  3：插入数据到数据库中
        let saveSingObj = optUpload(ctx)
        let result = await musicModel.addMusic(saveSingObj)
        console.log(result)
        //  4: 响应插入结果给客户端
        if(result.affectedRows == 1){
            ctx.body = {
                code:"001",
                msg:'添加音乐成功'
            }
            return 
        }
    },
    // 更新音乐
    updateMusic: async (ctx,next) =>{
        let opts = optUpload(ctx)
        let id = ctx.request.body.id;
        console.log(opts)
         console.log(id)
        opts = Object.assign(opts,{id})
        console.log(opts)
        let result = await musicModel.updataMusic(opts)
        if(result.affectedRows !==1){
            ctx.throw('更新失败')
            
        }
        ctx.body = {
            code: '001',
            msg: '更新成功'
        }
    },
    
        deleteMusic: async(ctx,next)=>{
            let id = ctx.request.body.id;
            let result = await musicModel.deleteMusic(id)
            // console.log(result.affectedRows)
            if(result.affectedRows !== 1){
                ctx.body = {
                    code: '002',
                    msg: '删除失败'
                }
                return;
            }
            ctx.body = {
                code:'001',msg:'删除成功'
            }
        }
    }
    
