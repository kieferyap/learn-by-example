import BaseModel from "../src/base-model"

export default class Role extends BaseModel {
  resource() {
    return 'roles'
  }
}