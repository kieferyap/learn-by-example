import BaseModel from "../src/base-model"
import Role from "./role"
import Post from "./post"

interface User {
  id: number
  username: string
  password: string
  roleType: Role
}

class User extends BaseModel {
  resource() {
    return 'users'
  }

  // Lazy loading
  posts() {
    return this.hasMany(Post)
  }

  relations() {
    return {
      roletype: Role,
    }
  }
}

export default User
