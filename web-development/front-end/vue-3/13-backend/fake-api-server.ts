import { Request, Response } from 'express'
import { users, roles, posts } from './fake-api-data'
import { Post } from './fake-api-data-types'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())

let localUsers = users
let localPosts = posts

//// GET requests for all tables
app.get('/api/users', (req: Request, res: Response) => {
  console.log('[GET] all users')
  res.json(localUsers)
})

app.get('/api/roles', (req: Request, res: Response) => {
  console.log('[GET] all roles')
  res.json(roles)
})

app.get('/api/posts', (req: Request, res: Response) => {
  const filter = req.query.filter

  // Get all posts
  if (!filter) {
    console.log('[GET] all posts')
    res.json(localPosts)
    return
  }
  
  const userId = filter['userId']
  const postId = filter['postId']

  // Get post with specific ID
  if (postId) {
    console.log(`[GET] post with id: ${postId}`)
    const post = localPosts.find(post => post.id === Number(postId));
    post
      ? res.json(post)
      : res.status(404).json({ error: 'Resource not found' })
  }

  // Get post from specific user with userID
  else if (userId) {
    console.log(`[GET] post from user with userId: ${userId}`)
    const posts = localPosts.filter(post => post.userId === Number(userId));
    posts
      ? res.json(posts)
      : res.status(404).json({ error: 'Resource not found' })
  }
})

//// Get specific ID
// User by user ID
app.get('/api/user/id/:id', (req: Request, res: Response) => {
  console.log(`[GET] user with id: ${req.params.id}`)
  const user = localUsers.find(user => user.id === Number(req.params.id));
  user
    ? res.json(user)
    : res.status(404).json({ error: 'Resource not found' })
})

// User by user ID
app.get('/api/user/name/:username', (req: Request, res: Response) => {
  console.log(`[GET] user with username: ${req.params.username}`)
  const user = localUsers.find(user => user.username === req.params.username);
  user
    ? res.json(user)
    : res.status(404).json({ error: 'Resource not found' })
})

// Role by type ID
app.get('/api/role/:type', (req: Request, res: Response) => {
  console.log(`[GET] role with type: ${req.params.type}`)
  const role = roles.find(role => role.type === req.params.type);
  role
    ? res.json(role)
    : res.status(404).json({ error: 'Resource not found' })
})

// Post by ID
app.get('/api/posts/:id', (req: Request, res: Response) => {
  console.log(`[GET] post with id: ${req.params.id}`)
  const post = localPosts.find(post => post.id === Number(req.params.id));
  post
    ? res.json(post)
    : res.status(404).json({ error: 'Resource not found' })
})

//// CREATE post
app.post('/api/post', (req: Request, res: Response) => {
  console.log(`[POST] post with parameters: ${req.body}`)
  const newPost: Post = { id: posts.length + 1, ...req.body}
  localPosts.push(newPost)
  res.json(newPost)
})

//// UPDATE
// Post
app.patch('/api/post/:id', (req: Request, res: Response) => {
  console.log(`[PATCH] post with id: ${req.params.id}, and parameters: ${req.body}`)
  const { id } = req.params
  const { title, body, date } = req.body
  const postIndex = localPosts.findIndex(post => post.id === Number(id))

  if (postIndex !== -1) {
    localPosts[postIndex] = { ...localPosts[postIndex], title, body, date}
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