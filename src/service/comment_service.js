const connection = require('../app/dataBase')
class CommentService {
   async create (commenId, content, userId) {
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?)`
    const result = await connection.execute(statement, [content, commenId, userId])
    return result[0]
   }

   async reply(momentId, content, userId, commentId) {
      const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?)`
      const result = await connection.execute(statement, [content, momentId, userId, commentId])
      return result[0]      
   }

   async update(commentId, content) {
      const statement = `UPDATE comment set content = ? WHERE id = ?`
      const result = await connection.execute(statement, [content, commentId])
      return result[0]  
   }

   async delete(commentId) {
      const statement = `DELETE FROM comment WHERE id = ?`
      const result = await connection.execute(statement, [commentId])
      return result[0]  
   }
}

module.exports = new CommentService()