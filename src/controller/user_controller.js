const service = require('../service/user_service')

class UserController {
    async created (ctx, next) {
       // 获取用户请求传递的参数
       const user = ctx.request.body
       // 查询数据
      const userRes = await service.create(user)
       // 返回数据
      ctx.body = userRes  
    }
}


module.exports = new UserController()