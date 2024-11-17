// Custom type 
export const RoleType = {
  User: 'U',
  Moderator: 'M',
  Admin: 'A'
} as const

export type RoleType = typeof RoleType[keyof typeof RoleType]
