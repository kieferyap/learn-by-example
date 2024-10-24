import { Request, Response } from 'express'
import { users, roles, posts } from './fake-api/data'
import { Post } from './fake-api/types'

import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

let localUsers = users
let localPosts = posts

//// GET requests for all tables
app.get('/api/users', (req: Request, res: Response) => {
  const filter = req.query.filter

  // Get all users
  if (!filter) {
    console.log('[GET] all users')
    res.json(localUsers)
    return
  }

  const username = filter['username']

  if (username) {
    console.log(`[GET] user with username: ${username}`)
    const user = localUsers.find(user => user.username === username);
    user
      ? res.json(user)
      : res.status(404).json({ error: 'Resource not found' })
  }
})

app.get('/api/roles', (req: Request, res: Response) => {
  const filter = req.query.filter

  // Get all roles
  if (!filter) {
    console.log('[GET] all roles')
    res.json(roles)
    return
  }

  const type = filter['type']
  if (type) {
    console.log(`[GET] role with type: ${type}`)
    const role = roles.find(role => role.type === type);
    role
      ? res.json(role)
      : res.status(404).json({ error: 'Resource not found' })
  }
})

app.get('/api/posts', (req: Request, res: Response) => {
  const filter = req.query.filter

  // Get all posts
  if (!filter) {
    console.log('[GET] all posts')
    res.json(localPosts)
    return
  }

  const userId = Number(filter['userId'])

  // Get post from specific user with userID
  if (userId) {
    console.log(`[GET] post from user with userId: ${userId}`)
    const posts = localPosts.filter(post => post.userId === userId)
    posts
      ? res.json(posts)
      : res.status(404).json({ error: 'Resource not found' })
  }
})

//// GET by ID
app.get('/api/posts/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  console.log(`[GET] post with id: ${id}`)
  const post = localPosts.find(post => post.id === id)
  post
    ? res.json(post)
    : res.status(404).json({ error: 'Resource not found' })
})

app.get('/api/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  console.log(`[GET] user with id: ${id}`)
  const user = localUsers.find(user => user.id === id)
  user
    ? res.json(user)
    : res.status(404).json({ error: 'Resource not found' })
})

//// CREATE post
app.post('/api/posts', (req: Request, res: Response) => {
  console.log(`[POST] post with parameters: ${JSON.stringify(req.body)}`)
  const newPost: Post = { id: localPosts.length + 1, ...req.body }
  localPosts.push(newPost)
  res.json(newPost)
})

//// UPDATE
// Post
app.put('/api/posts/:id', (req: Request, res: Response) => {
  console.log(`[PUT] post with id: ${req.params.id}, parameters: ${JSON.stringify(req.params)}, and body: ${JSON.stringify(req.body)}`)
  const { id } = req.params
  const { title, body, date } = req.body
  const postIndex = localPosts.findIndex(post => post.id === Number(id))

  if (postIndex !== -1) {
    localPosts[postIndex].title = title
    localPosts[postIndex].body = body
    localPosts[postIndex].date = date
    res.json(localPosts[postIndex])
  } else {
    res.status(404).json({ error: 'Resource not found' })
  }
})

//// DELETE
// Post
app.delete('/api/post/:id', (req: Request, res: Response) => {
  console.log(`[DELETE] post with id: ${req.params.id}`)
  const { id } = req.params
  const postIndex = posts.findIndex(post => post.id === Number(id))

  if (postIndex !== -1) {
    localPosts = localPosts.filter(post => post.id !== Number(id))
    res.status(204).send()
  } else {
    res.status(404).json({ error: 'Resource not found' })
  }
})

// User
app.delete('/api/user/:id', (req: Request, res: Response) => {
  console.log(`[DELETE] user with id: ${req.params.id}`)
  const { id } = req.params
  const userIndex = localUsers.findIndex(user => user.id === Number(id))

  if (userIndex !== -1) {
    localUsers = localUsers.filter(user => user.id !== Number(id))
    res.status(204).send()
  } else {
    res.status(404).json({ error: 'Resource not found' })
  }
})

const port = 3001
app.listen(port, () => {
  console.log(`Fake API server is now running on http://localhost:${port}`)
})