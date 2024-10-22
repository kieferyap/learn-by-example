import BaseModel from "../src/base-model"

export default class Post extends BaseModel {
  resource() {
    return 'posts'
  }
}