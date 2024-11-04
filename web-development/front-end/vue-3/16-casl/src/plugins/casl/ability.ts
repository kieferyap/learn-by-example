import { createMongoAbility } from "@casl/ability"

// Action
export const Action = {
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete',
  Manage: 'manage',
} as const

export type Action = typeof Action[keyof typeof Action]

// Subject
export const Subject = {
  All: 'All',
  Post: 'Post',
  User: 'User',
} as const

export type Subject = typeof Subject[keyof typeof Subject]

// Rule
export interface Rule { 
  action: Action
  subject: Subject
}

export const ability = createMongoAbility()
