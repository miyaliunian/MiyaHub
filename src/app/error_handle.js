const { 
    NAME_OR_PASSWORD_IS_REQUIRED,
    USER_ALREADY_EXISTS,
    USER_DOES_NOT_EXISTS,
    PASSWORD_IS_INCORRENT,
    UNAUTHORIZATION,
    UNPERMISSION
 } = require('../constants/error_types')
const errorHandler = (error, ctx) => {
    let status, message
    console.log('error-Type:', error.message)
    switch (error.message) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400 // 400表示请求有问题
            message = '用户名密码不能为空'
            break;
        case USER_ALREADY_EXISTS:
            status = 409 // 400表示请求有问题
            message = '用户名已经存在'
            break;   
        case USER_DOES_NOT_EXISTS:
            status = 400 // 400表示请求有问题
            message = '用户名不存在'
            break;      
        case PASSWORD_IS_INCORRENT:
            status = 400 // 400表示请求有问题
            message = '密码是错误的'
            break;    
        case UNAUTHORIZATION:
            status = 401 // 400表示请求有问题
            message = '无效的token'
            break;   
        case UNPERMISSION:
            status = 401 // 400表示请求有问题
            message = '您不具备操作的权限！'
            break;                                                
        default:
            status = 404 // 400表示请求有问题
            message = '请求为空'
            break;
    }
    ctx.status = status
    ctx.body = message
}

module.exports = {
    errorHandler
}