import BaseModel from "../src/base-model"
import User from './user'

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

  relations() {
    // Use 'relationships.user' instead to eager load
    return {
      userId: User
    }
  }
}

export default Post
