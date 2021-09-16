const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const { errorHandler } = require('./error_handle')
const useRoutes = require('../router')
const app = new koa()

// 解析JSON
app.use(bodyParser())
// // 处理用户登录
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// // 处理JWT
// app.use(authRouter.routes() )
// app.use(authRouter.allowedMethods())
// 类似于webpack 动态加载
useRoutes(app) 

// 处理错误
app.on('error', errorHandler)
module.exports = app