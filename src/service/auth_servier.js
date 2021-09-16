const connection = require('../app/dataBase')

class AuthService {
    async checkResource(tableName, id, userId) {
        const statement = `SELECT * FROM ${tableName} WHERE id= ? AND user_id= ?`   
        const [result] = await connection.execute(statement, [ id, userId ])
        return result.length === 0 ? false :  true 
    }
    

}


module.exports = new AuthService()