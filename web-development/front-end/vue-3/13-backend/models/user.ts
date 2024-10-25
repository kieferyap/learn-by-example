import BaseModel from "../src/base-model"

interface User {
  id: number
  username: string
  password: string
  roleType: string
}

// TODO: Define relations with other tables
class User extends BaseModel {
  resource() {
    return 'users'
  }
}

export default User
