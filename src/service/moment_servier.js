const connection = require('../app/dataBase')
class MomentService {
    async create (userId, content) {
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
        const result = await connection.execute(statement, [userId, content])
        console.log('插入的结果:',result)
        return result[0]
    }

    async getMomentById(momentId) {
        const statement = `SELECT
        m.id,
        m.content,
        m.createAt,
        m.updateAt,
        JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id',
                c.id,
                'content',
                c.content,
                'createTime',
                c.createAt,
                'user',
            JSON_OBJECT( 'id', cu.id, 'name', cu.NAME )) 
        ) comments 
    FROM
        moment m
        LEFT JOIN USER u ON m.user_id = u.id
        LEFT JOIN comment c ON c.moment_id = m.id
        LEFT JOIN user cu ON c.user_id = cu.id 
    WHERE
        m.id = ?`;
        const result = await connection.execute(statement, [ momentId ])
        return result[0]
    }


    async getMomentList(offset, size) {
        const statement = `SELECT
        m.id,
        m.content,
        m.createAt,
        m.updateAt,
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        (SELECT COUNT(*) FROM comment cm WHERE cm.moment_id = m.id )commentCount
        FROM moment m LEFT JOIN user u ON m.user_id = u.id  LIMIT ?, ?`;
        const result = await connection.execute(statement, [ offset,  size])
        return result[0]
    }

    async momentUpdate(content, momentId) {
       const statement = `UPDATE moment SET content = ? WHERE id = ?`
       const result = await connection.execute(statement, [ content,  momentId])
       return result[0]      
    }

    async momentDeleteBymomentId(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?`
        const result = await connection.execute(statement, [momentId])
        return result[0]     
    }
}

module.exports = new MomentService()