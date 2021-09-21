
const Multer = require('koa-multer')
const Jimp = require('jimp')
const path = require('path')
const { 
    AVATAR_PATH,
    PICTURE_PATH
 } = require('../constants/file-path')

const avatarUpload = Multer({
    dest: AVATAR_PATH
})
// single('avatar') 对应的是form-multar中附件对应的key
const avatarHandler =  avatarUpload.single('avatar')



// 动态配图
const pictureUpload = Multer({
    dest: PICTURE_PATH
})
const pictureHandler =  pictureUpload.array('picture', 9)


const pictureResize = async (ctx, next) => {
    // 1.获取所有的图像信息
    const files = ctx.req.files
    // 2.对图像进行遍历并对图片进行处理 可以借助第三方库
    // sharp(path).resize
    // 也可以借助jimp
    for (const file of files) {
        const destPath = path.join(file.destination, file.filename)
        // 它其实返回的是Promise
        Jimp.read(file.path).then(image => {
            // 这个地方返回的是图像信息
            // 保持比例缩放 根据宽度自动调整高度
            // 返回大图
            image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)

            //返回中等图片  
            image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)

            //返回小图    
            image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
        }) 
    }

    await next()
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}