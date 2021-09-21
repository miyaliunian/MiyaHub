const Router = require('koa-router')
const userRouter = new Router({prefix: '/users'})
const {verifyUser, handlePassword } = require('../middleware/user_middleware')
const { 
    created,
    avatarInfo
 } =require('../controller/user_controller')


const {
    verifyAuth
} = require('../middleware/auth_middleware')


userRouter.post('/', verifyUser,handlePassword,created)

// 获取用户头像
userRouter.get('/:userId/avatar', verifyAuth, avatarInfo)

module.exports = userRouter