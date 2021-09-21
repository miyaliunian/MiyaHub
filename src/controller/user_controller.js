const userService = require('../service/user_service')
const fileService = require('../service/file_service')
const {
  AVATAR_PATH
} = require('../constants/file-path')
const fs= require('fs')

class UserController {
    async created (ctx, next) {
       // 获取用户请求传递的参数
       const user = ctx.request.body
       // 查询数据
      const userRes = await userService.create(user)
       // 返回数据
      ctx.body = userRes  
    }

    async avatarInfo(ctx, next) {
      const { userId } = ctx.params
      const avatarInfo = await fileService.getAvatarByUserId(userId)
      // body可以传递很多类型的数据 buffer
      // 这边的这种方式是普通文件下载 如果是想显示图片的话 则需要设置content-type
      ctx.response.set('content-type', avatarInfo.mimetype)
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)      
    }
}


module.exports = new UserController()