 const crypto  = require('crypto')
 const md5Password = (password) => {
    const md5 = crypto.createHash('md5')
    // 默认返回的是二进制，我将它转换成16进制
    const res = md5.update(password).digest('hex')
    return res
 }

 module.exports = {
    md5Password
 }