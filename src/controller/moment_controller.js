const momentServie = require('../service/moment_servier')
const fileService = require('../service/file_service')
const fs = require('fs')
const {
    PICTURE_PATH
} = require('../constants/file-path')
class MomentController {
    // 插入动态
    async create(ctx, next) {
        const userId = ctx.user.id;
        const content = ctx.request.body.content
        console.log('客户端登录人userId:', userId);
        console.log('客户端发布过来的content:', content);
        const result = await momentServie.create(userId, content)
        ctx.body = result
    }

    // 获取动态
    async momentDetail(ctx, next) {
        // params 跟vue.push 参数写在url拼接路径上
        // query 跟 vue-router.query 参数拼接在？是一样的
        const momentId = ctx.params.momentId
        const result = await momentServie.getMomentById(momentId)
        ctx.body = result
    }

    // 批量获取列表
    async list(ctx, next)  {
        const { offset, size } = ctx.query
        const result = await momentServie.getMomentList(offset, size)
        ctx.body = result
    }

    async momentUpdate(ctx, next) {
        const { momentId } = ctx.params;
        const { content } = ctx.request.body
        const result = await momentServie.momentUpdate(content, momentId)
        ctx.body = result
    }

    async momentDelete(ctx, next) {
        const { momentId } = ctx.params;
        const result = await momentServie.momentDeleteBymomentId(momentId)
        ctx.body = result
    }

    async addLabels(ctx, next) {
        const { labels } = ctx
        const { momentId } = ctx.params
        ctx.body = labels
        for (const label of labels) {
            const isExist = await momentServie.hasLabel(momentId, label.id)
            if (!isExist) {
               await momentServie.addLabel(momentId, label.id) 
            }
        }
        ctx.body = "!给动态添加标签成功"
    }


    async fileInfo(ctx, next) {
        let {filename} = ctx.params
        const fileInfo = await fileService.getFileByFilename(filename)
        ctx.response.set(
            'content-type',fileInfo.mimetype
            )
        const {type} =ctx.query
        const types = [
            "small",
            "middle",
            "large"
        ]
        if (types.some(item => item === type)) {
            filename = `${filename}-${type}` 
        }
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }

}
module.exports =  new MomentController()