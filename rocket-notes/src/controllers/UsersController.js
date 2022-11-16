const AppError = require('../utils/AppError')
const { hash, compare } = require("bcryptjs")

const sqliteConnection = require('../database/sqlite')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body // Pega as let no body

    const database = await sqliteConnection()

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      throw new AppError("Email já usado")
    }

    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return response.status(201).json()
    
  }

  async update(request, response){
    const { name, email, password, oldPassword } = request.body
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])

      if(!user){
        throw new AppError("Usuário não encontrado")
      }

      const userWidthUpdateEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

      if(userWidthUpdateEmail && userWidthUpdateEmail.id !== user.id){
        throw new AppError("Este email já esta em uso") // revisar
      }
      

      if(password && oldPassword){
        const checkOldPassword = await compare(oldPassword, user.password)

          if(!checkOldPassword){
            throw new AppError("Senha antiga não confere")
          }

        user.password = await hash(password, 8)
      }

      if( password && !oldPassword){
        throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
      }

      
    user.name = name ?? user.name; // important
    user.email = email ?? user.email;

    await database.run(`
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE ID = ?`,
      [user.name, user.email,user.password, user_id]);

    return response.status(200).json()
}}

module.exports = UsersController
