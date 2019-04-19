const path = require('path')
const musicModel = require('../modules/musicModel')

// 作用；返回获取的请求数据数据（添加到数据库中的数据）
function optUpload(ctx) {
    // 1：获取字符串数据
    let {
        title,
        singer,
        time
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
        filelrc,
        file
    } = ctx.request.files;
    // 2.5 歌词可选（可有可无）


    // 为了我们后面微信小程序，也能调用这个接口
    saveSingObj.filelrc = 'no upload filelrc';
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
    //  添加用户身份 uid ??????
    saveSingObj.uid = 1
    return saveSingObj

}

module.exports = {
    showIndex: async (ctx, next) => {
    //   根据用户的session 中id  来查询数据  ？？？？？？
        let uid = 1;
        // 根据id 查询歌曲
        let musics = await musicModel.findMusicByUid(uid);
        ctx.render('index',{
            musics
        })
    },
    showAdd: async (ctx, next) => {
        ctx.render('add')
    },
    showEdit:async(ctx,next)=>{
        // 1：获取请求参
        let id = ctx.query.id
        // 2： 根据id 查询数据
        let musics  = await musicModel.findMusicById(id)
        let music = musics[0]
        console.log(music)
        ctx.render('edit',{
            music
        })
    },
    async addMusic(ctx, next) {
        // 获取到存放到数据库中的数据（请求体中数据）
        let opts = optUpload(ctx)
        //  3：插入数据到数据库中
        let result = await musicModel.addMusic(opts)
        console.log(result)
        //  4: 响应插入结果给客户端
        if (result.affectedRows == 1) {
            ctx.body = {
                code: "001",
                msg: '添加音乐成功'
            }
            return
        }
        ctx.body = {
            code: '002',
            msg: '添加失败请求重新添加'
        }

    },
    /**
     * 更新音乐
     */
    updateMusic: async (ctx, next) => {
        // 1: 接收请求参数
        let opts = optUpload(ctx)
        let id = ctx.request.body.id;
        // 合并对象处理
        opts = Object.assign(opts, {
            id
        })
        // 更新数据
        let result = await musicModel.updataMusic(opts)
        if (result.affectedRows !== 1) {
            // 没有给更新成功
            ctx.throw('更新失败')
        }
        ctx.body = {
            code: '001',
            msg: '更新成功'
        }
    },
    /**
     * 删除音乐
     */
    deleteMusic: async (ctx, next) => {
        //获取解析的查询字符串, 当没有查询字符串时，返回一个空对象
        let id = ctx.request.body.id;

        let result = await musicModel.deleteMusics(id)

        if (result.affectedRows !== 1) {
            ctx.body = {
                code: '002',
                msg: '删除失败'
            }
            return
        }
        ctx.body = {
            code: "001",
            msg: '删除成功'
        }
    }
}