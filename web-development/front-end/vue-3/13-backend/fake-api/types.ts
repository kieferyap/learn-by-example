// Sample Tables

export interface Role {
  id: number
  type: string
  name: string
  action: string
  subject: string
  field: string
  permission: string
}

export interface Post {
  id: number
  title: string
  body: string
  date: string
  userId: number
}

export interface User {
  id: number
  username: string
  password: string
  roleType: string | Role
}