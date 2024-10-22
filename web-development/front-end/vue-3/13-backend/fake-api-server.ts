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
  res.json(localUsers)
})

app.get('/api/roles', (req: Request, res: Response) => {
  res.json(roles)
})

app.get('/api/posts', (req: Request, res: Response) => {
  res.json(localPosts)
})

//// Get specific ID
// User by user ID
app.get('/api/user/:id', (req: Request, res: Response) => {
  const user = localUsers.find(user => user.id === Number(req.params.id));
  user
    ? res.json(user)
    : res.status(404).json({ error: 'Resource not found' })
})

// Role by type ID
app.get('/api/role/:type', (req: Request, res: Response) => {
  const role = roles.find(role => role.type === req.params.type);
  role
    ? res.json(role)
    : res.status(404).json({ error: 'Resource not found' })
})

// Post by user ID
app.get('/api/post/user/:userId', (req: Request, res: Response) => {
  const post = localPosts.find(post => post.userId === Number(req.params.userId));
  post
    ? res.json(post)
    : res.status(404).json({ error: 'Resource not found' })
})

// Post by ID
app.get('/api/post/detail/:id', (req: Request, res: Response) => {
  const post = localPosts.find(post => post.id === Number(req.params.id));
  post
    ? res.json(post)
    : res.status(404).json({ error: 'Resource not found' })
})

//// CREATE post
app.post('/api/post', (req: Request, res: Response) => {
  const newPost: Post = { id: posts.length + 1, ...req.body}
  localPosts.push(newPost)
  res.json(newPost)
})

//// UPDATE
// Post
app.patch('/api/post/:id', (req: Request, res: Response) => {
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