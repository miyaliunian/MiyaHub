const connection = require('../app/dataBase')
const loggerProxy = require('../app/logConfig')
class MomentService {
    async create (userId, content) {
        const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
        const result = await connection.execute(statement, [userId, content])
        loggerProxy.info(result[0])
        return result[0]
    }

    async getMomentById(momentId) {
        const statement = `SELECT
        m.id,
        m.content,
        m.createAt,
        m.updateAt,
        JSON_OBJECT( 'id', u.id, 'name', u.NAME, 'avatarUrl', u.avatar_url ) author,
    IF
        ( COUNT( l.id ), JSON_ARRAYAGG( JSON_OBJECT( 'id', l.id, 'name', l.NAME )), NULL ) labels,
        (
        SELECT
        IF
            (
                COUNT( c.id ),
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id',
                        c.id,
                        'content',
                        c.content,
                        'createTime',
                        c.createAt,
                        'user',
                    JSON_OBJECT( 'id', cu.id, 'name', cu.NAME, 'avatarUrl', cu.avatar_url )) 
                ),
            NULL 
            ) comments 
        FROM
            COMMENT c
            LEFT JOIN USER cu ON c.user_id = cu.id 
        WHERE
            m.id = c.moment_id 
        ) comments 
    FROM
        moment m
        LEFT JOIN USER u ON m.user_id = u.id
        LEFT JOIN COMMENT c ON c.moment_id = m.id
        LEFT JOIN USER cu ON c.user_id = cu.id
        LEFT JOIN moment_label ml ON m.id = ml.moment_id
        LEFT JOIN label l ON ml.label_id = l.id 
    WHERE
        m.id = ? 
    GROUP BY
        m.id`;
        const result = await connection.execute(statement, [ momentId ])
        loggerProxy.info(result[0])
        return result[0]
    }


    async getMomentList(offset, size) {
        const statement = `SELECT
        m.id,
        m.content,
        m.createAt,
        m.updateAt,
        JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author,
        ( SELECT COUNT(*) FROM COMMENT cm WHERE cm.moment_id = m.id ) commentCount,
        ( SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id ) labelCount,
        ( SELECT JSON_ARRAYAGG( CONCAT( 'http://localhost:8000/moment/images/', file.filename )) FROM file WHERE m.id = file.moment_id ) images
    FROM
        moment m
        LEFT JOIN USER u ON m.user_id = u.id
        LIMIT ?, ?`;
        const result = await connection.execute(statement, [ offset,  size])
        loggerProxy.info(result[0])
        return result[0]
    }

    async momentUpdate(content, momentId) {
       const statement = `UPDATE moment SET content = ? WHERE id = ?`
       const result = await connection.execute(statement, [ content,  momentId])
       loggerProxy.info(result[0])
       return result[0]      
    }

    async momentDeleteBymomentId(momentId) {
        const statement = `DELETE FROM moment WHERE id = ?`
        const result = await connection.execute(statement, [momentId])
        loggerProxy.info(result[0])
        return result[0]     
    }


    async hasLabel(momentId, labelId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id = ? and label_id= ?`
        const [result] = await connection.execute(statement, [momentId, labelId])
        loggerProxy.info(result[0])
        return result[0]
    }


    async addLabel(momentId, labelId) {
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES(?, ?)`
         try {
            const [result] = await connection.execute(statement, [momentId, labelId])
            loggerProxy.info(result[0])
            return result[0]      
         } catch (error) {
            loggerProxy.error(result)
         }   
    }
}

module.exports = new MomentService()