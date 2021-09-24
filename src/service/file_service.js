const connection = require('../app/dataBase')
const loggerProxy = require('../app/logConfig')
class FileService {
    async saveAvatar (filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar ( filename, mimetype, size, user_id )
        VALUES
            (?,?,?,?)`
        const result = await connection.execute(statement, [filename, mimetype, size, userId])
        loggerProxy.info(result[0])
        return result[0]
    }

    async getAvatarByUserId(userId){
        const statement = `SELECT * from avatar WHERE user_id = ?`
        const [result] = await connection.execute(statement, [userId])
        loggerProxy.info(result[0])
        return result.pop()
    }

    async createFile(filename, mimetype, size, userId, momentId){
        const statement = `INSERT INTO file(filename, mimetype, size, user_id, moment_id) VALUES(?,?,?,?,?)`
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
        loggerProxy.info(result[0])
        return result[0]          
    }

    async getFileByFilename(filename){
        const statement = `SELECT * from file WHERE filename = ?`
        const [result] = await connection.execute(statement, [filename])
        loggerProxy.info(result[0])
        return result[0]    
    }
}

module.exports = new FileService()