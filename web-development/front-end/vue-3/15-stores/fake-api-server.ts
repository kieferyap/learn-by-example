import { Request, Response } from 'express'
import { users, roles, posts } from './src/fake-api/data'
import { User, Post } from './src/fake-api/types'

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
  const include = req.query.include

  // Get all users
  if (!filter) {
    console.log('[GET] all users')
    const entries: User[] = JSON.parse(JSON.stringify(localUsers)) // Create deep copy
    
    // Include
    if (include?.length) {
      console.log('[GET][USER] Includes:', include)
      entries.forEach((entry: User) => {
        entry.roleType = roles.find(role => role.type === entry.roleType) ?? ''
      })
      res.json(entries)
      return
    }

    res.json(localUsers)
    return
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
    const entry = roles.find(role => role.type === type)
    entry
      ? res.json(entry)
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
    const entry = localPosts.filter(post => post.userId === userId)
    entry
      ? res.json(entry)
      : res.status(404).json({ error: 'Resource not found' })
  }
})

//// GET by ID
app.get('/api/posts/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  console.log(`[GET] post with id: ${id}`)
  const entry = localPosts.find(post => post.id === id)
  entry
    ? res.json(entry)
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

app.put('/api/users/:id', (req: Request, res: Response) => {
  console.log(`[PUT] user with id: ${req.params.id}, parameters: ${JSON.stringify(req.params)}, and body: ${JSON.stringify(req.body)}`)
  const { id } = req.params
  const { username } = req.body
  const userIndex = localUsers.findIndex(user => user.id === Number(id))

  if (userIndex !== -1) {
    localUsers[userIndex].username = username
    res.json(id)
  } else {
    res.status(404).json({ error: 'Resource not found' })
  }
})

//// DELETE
// Post
app.delete('/api/posts/:id', (req: Request, res: Response) => {
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

// Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
  console.log(`[POST] Logging in with request:`, req.body)
  const { username, password } = req.body

  const userIndex = localUsers.findIndex(user => user.username === username && user.password === password)
  if (userIndex === -1) {
    res.status(401).json({ error: 'Incorrect credentials' })
    return
  }

  // NOTE: Do NOT use this as an authToken. I'm only doing this as an example.
  const loggedInUser = localUsers[userIndex]
  res.json({
    authToken: `justAnAuthTokenYay123456${username}`,
    userData: {
      id: loggedInUser.id,
      username: loggedInUser.username,
      roleType: loggedInUser.roleType
    }
  })
})

const port = 3001
app.listen(port, () => {
  console.log(`Fake API server is now running on http://localhost:${port}`)
})