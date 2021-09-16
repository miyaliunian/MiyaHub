// 用户登录
 const Router = require('koa-router')

 const {
  login,
  success
} = require('../controller/auth_controller.js')

 const {
   verifyLogin,
   verifyAuth
 } = require('../middleware/auth_middleware')
 const authRouter = new Router() 



 authRouter.post('/login', verifyLogin, login )


// 测试token是否过期 验证授权
authRouter.get('/test', verifyAuth, success) 

 module.exports = authRouter