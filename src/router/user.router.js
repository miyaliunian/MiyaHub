const Router = require('koa-router')
const userRouter = new Router({prefix: '/users'})
const {verifyUser, handlePassword } = require('../middleware/user_middleware')
const { created } =require('../controller/user_controller')

userRouter.post('/', verifyUser,handlePassword,created)

module.exports = userRouter