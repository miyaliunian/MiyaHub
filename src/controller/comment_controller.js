const commentService = require('../service/comment_service')
class CommentControllrer {
   async create (ctx, next) {
      const {momentId, content} = ctx.request.body
      const {id: userId} = ctx.user
      const result = await commentService.create(momentId, content, userId)
      ctx.body = result
   }
   async reply (ctx, next) {
      const {momentId, content} = ctx.request.body
      const {id: userId} = ctx.user
      const { commentId } = ctx.params
      const result = await commentService.reply(momentId, content, userId, commentId)
      ctx.body = result
   } 

   async update(ctx, next) {
      const {content} = ctx.request.body
      const { commentId } = ctx.params
      const result = await commentService.update(commentId, content)
      ctx.body = result
   }

   async remove(ctx, next) {
      const { commentId } = ctx.params
      const result = await commentService.delete(commentId)
      ctx.body = result
   }

   async list(ctx, next) {
      const { momentId } = ctx.query
      const result = await  commentService.getCommentsByMomentId(momentId)
      ctx.body = result
   }
}

module.exports = new CommentControllrer()