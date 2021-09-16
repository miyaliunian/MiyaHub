const {NAME_OR_PASSWORD_IS_REQUIRED, USER_ALREADY_EXISTS} = require('../constants/error_types')
const servier = require('../service/user_service')
// 对密码进行加密处理
const { md5Password } = require('../utils/password_handle')
const verifyUser = async (ctx, next) => {
  const {name, password} = ctx.request.body  
  if (!name || !password || name === '' || password === '') {
      const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
      return ctx.app.emit('error', error, ctx)
  }
  // 判断这次的用户名是没有被注册过的
  const result = await servier.getUserByName(name)
  if (result.length) {
    const error = new Error(USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body  
  // 对用户名进行加密
  ctx.request.body.password =  md5Password(password)
  await next()
}

module.exports = {
    verifyUser,
    handlePassword
}