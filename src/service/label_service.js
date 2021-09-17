const connection = require('../app/dataBase')
class LabelService {
 async create(labelName) {
    const statement = `INSERT INTO label (name) VALUES (?)`
    const  [result]  = await connection.execute(statement, [labelName])
    return [result] 
 }
   
}

module.exports = new LabelService()