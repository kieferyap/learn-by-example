import BaseModel from "../src/base-model"

export default class User extends BaseModel {
  resource() {
    return 'users'
  }
}