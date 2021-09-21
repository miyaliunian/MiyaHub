const servier = require('../service/file_service')
const userService = require('../service/user_service')
const fileService = require('../service/file_service')
const {
    AVATAR_PATH
} = require('../constants/file-path')
const {
    APP_HOST,
    APP_PORT,
} =require('../app/config')
class FileController {
    async saveAvatarInfo(ctx, next) {
        //获取头像相关信息
        const {filename, mimetype, size} = ctx.req
        .file
        const { id:userId } = ctx.user
        const result = await servier.saveAvatar(filename, mimetype, size, userId)
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
        const avaRes = await userService.updateAvatarUrlById(userId, avatarUrl)
        ctx.body = '用户上传头像成功' 
    }

    async savePictureInfo(ctx, next) {
        const {files} = ctx.req
        const { id:userId } = ctx.user
        const {momentId} = ctx.query
        for (const file of files) {
            const {filename, mimetype, size}  = file
            await fileService.createFile(filename, mimetype, size, userId, momentId)
        }
        ctx.body= "动态配图上传完成"
    }
}

module.exports = new FileController()