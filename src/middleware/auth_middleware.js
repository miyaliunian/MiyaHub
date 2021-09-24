const jwt = require('jsonwebtoken')
const {
    NAME_OR_PASSWORD_IS_REQUIRED, 
    USER_DOES_NOT_EXISTS,
    PASSWORD_IS_INCORRENT,
    UNAUTHORIZATION,
    UNPERMISSION
} = require('../constants/error_types')


const { 
    PUBLIC_KEY 
} = require('../app/config')


const servier = require('../service/user_service')

const authService = require('../service/auth_servier')

const {
    md5Password
} = require('../utils/password_handle')


const verifyLogin = async (ctx, next) => {
    const {name, password} = ctx.request.body  
    if (!name || !password || name === '' || password === '') {
        const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断这次的用户名是没有被注册过的
    const result = await servier.getUserByName(name)
    const user = result[0]
    if (!user) {
      const error = new Error(USER_DOES_NOT_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }
    // 判断密码是否一致
    if (!md5Password(password) === user.password ) {
        const error  = new Error(PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }

    ctx.user = user

    await next()
}

const verifyAuth = async (ctx, next) => {
    console.log('验证授权的—verifyAuth')
    // 获取token
    const authorization = ctx.headers.authorization
    // 如果header中没有token
    if (!authorization) {
        const error = new Error(UNAUTHORIZATION)
        return ctx.app.emit('error', error , ctx)
    }
    const token = authorization.replace('Bearer', '').replace(' ', '')
    // 验证token
    try {
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
    }
}


const verifyPermission = async(ctx, next) => {
    console.log('权限验证->verifyPermission')
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id', '')
    const resourceId = ctx.params[resourceKey]
    const{id} = ctx.user
    try {
        const isPermission = await authService.checkResource(tableName, resourceId, id)
        if (!isPermission) throw new Error()
    } catch (err) {
        const error = new Error(UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

// 通过闭包的形式
// const verifyPermission = (tableName) => {
//     return async(ctx, next) => {
//         console.log('权限验证->verifyPermission')
//         const [resourceKey] = Object.keys(ctx.params)
//         const tableName = resourceKey.replace('Id', '')
//         const resourceId = ctx.params[resourceKey]
//         const{id} = ctx.user
//         try {
//             const isPermission = await authService.checkResource(tableName, resourceId, id)
//             if (!isPermission) throw new Error()
//         } catch (err) {
//             const error = new Error(UNPERMISSION)
//             return ctx.app.emit('error', error, ctx)
//         }
//         await next()
//     }
// }

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}