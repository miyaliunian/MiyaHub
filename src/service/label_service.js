const connection = require('../app/dataBase')
class LabelService {
 async create(labelName) {
    const statement = `INSERT INTO label (name) VALUES (?)`
    const [result]  = await connection.execute(statement, [labelName])
    return result[0] 
 }

async getLabels(limit, offset) {
    const statement = `SELECT * from label LIMIT ?,?`
    const [result]  = await connection.execute(statement, [offset, limit])
    return result
}
  
 async getLabelByName(name) {
   const statement = `SELECT * from label WHERE name = ?`
   const  [result]  = await connection.execute(statement, [name])
   return result[0]
 }
   
}

module.exports = new LabelService()