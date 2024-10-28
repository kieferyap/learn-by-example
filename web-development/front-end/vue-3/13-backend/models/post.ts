import BaseModel from "../src/base-model"

interface Post {
  id: number
  title: string
  body: string
  date: string
  userId: number
}
class Post extends BaseModel {
  resource() {
    return 'posts'
  }
}

export default Post
