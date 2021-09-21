
const Router = require('koa-router')

const fileRouter = new Router({
    prefix: '/upload'
})


const {
    verifyAuth
} = require('../middleware/auth_middleware')


const {
    saveAvatarInfo,
    savePictureInfo
} = require('../controller/file_controller')

const {
    avatarHandler,
    pictureHandler,
    pictureResize
} = require('../middleware/file_middleware')


// 存储头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)

// 动态配图接口
// 并对图片进行裁切 
fileRouter.post('/pictures', verifyAuth, pictureHandler, pictureResize, savePictureInfo)



module.exports = fileRouter