const Router = require('koa-router')
const { 
    verifyAuth,
    verifyPermission
 } = require('../middleware/auth_middleware')
const {
    create,
    reply, 
    update,
    remove
}  =require('../controller/comment_controller')
const commentRouter = new Router({
    prefix: '/comment'
})

// 发表评论
commentRouter.post('/', verifyAuth, create)

// 发表评论的回复
commentRouter.post('/:commentId/reply', verifyAuth, reply)

// 修改评论
commentRouter.patch('/:commentId',verifyAuth, verifyPermission ,update)

// 删除评论
commentRouter.delete('/:commentId',verifyAuth, verifyPermission ,remove)

module.exports = commentRouter