const connection = require('../app/dataBase')
class UserService {
  async create(user) {
      // 将user存储到数据库中
      const {name, password} = user
      const statement= `INSERT INTO user (name, password) VALUES (?, ?)`
      const result = await connection.execute(statement, [name, password]);
      return result[0]
  }

  async getUserByName(name) {
    const statement = 'SELECT * FROM `user` WHERE `name` = ?'
    const result = await connection.execute(statement, [name]);
    return result[0]
  }

  async updateAvatarUrlById(userId, avatarUrl) {
    const statement = 'UPDATE user SET avatar_url = ? WHERE id = ?;';
    const result = await connection.execute(statement, [avatarUrl, userId]);
    return result[0]
  }
}

module.exports = new UserService()