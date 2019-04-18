
const usersModel = require('../modules/usersModel')
module.exports = {
    showRegister: async ctx => {
        ctx.render('register')
    },
    checkUser: async (ctx, next) => {
        // 1：获取到 请求体中 username
        let {
            username
        } = ctx.request.body;

        // 2: 接收数据库查询结果 ——> 交给数据层处理
        let users = await usersModel.findUserByUsername(username)
        // res 有结果  ——> 用户存在  没有数据——> 可以注册
        console.log(users.length !== 0)
        if (users.length !== 0) {
            ctx.body = {
                code: '002',
                msg: '用户名已存在请登录'
            }
            return
        }
        // 存在用户
        ctx.body = {
            code: '001',
            msg: "可以注册了"
        }
    },
    doResgiter: async (ctx, next) => {
        // 1:接收参数
        let {
            username,
            password,
            email
        } = ctx.request.body
        // let Reg = /^\s\w{8,12}/
        // let emailReg =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/ 
        // - 2：拿请求参数与数据库中数据进行比价  username or emaill
        let users = await usersModel.findUserByUE(username, email)
        //   - 对请求进行验证处理  ？？？？
        //   - 2-1: username,判断用户是否存在
        if (users.length !== 0) {
            // 。3： 如果 用户名或者 邮箱那个已经存在，——>响应注册失败
            ctx.body = {
                code: '002',
                msg: '用户或者邮箱已经存在注册失败'
            }
            return
        }
         try {
            // - 4：如果用户或者邮箱不存在 可以注册，把请求数据插入到 数据中
            let result = await usersModel.resgiterUser(
                username,
                password,
                email
            )
            // result    affectedRows,  或者  insertId 判断是否插入数据成功
            if (result.affectedRows == 1) {
                ctx.body = {
                    code: '001',
                    msg: '注册成功'
                }
            }
       } catch (err) {
          ctx.body = {
                code: "002",
               msg: '注册失败'
            }
        }
    },
    showLogin: async (ctx, next) => {
        ctx.render('login')
    },
    doLogin: async (ctx, next) => {
       
            let{
                username
            } = ctx.requeest.body;
            let users = await usersModel.findUserByUsername(username)
            console.log(users.length ==0)
            if (users.length == 0 ) {
                ctx.body = {
                    code: '002',
                    msg: '用户名不存在'
                }
                return;
            }
        }
    }