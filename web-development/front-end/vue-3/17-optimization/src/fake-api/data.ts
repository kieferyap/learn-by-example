import { User, Role, Post } from './types'

// Sample Data
export const users: Array<User> = [
  {
    id: 1,
    username: 'dratini',
    password: 'Twister147', // Don't store them like this, in plain text...
    roleType: 'U'
  },
  {
    id: 2,
    username: 'bagon',
    password: 'DragonClaw371', // ...Instead, use a hashing algorithm.
    roleType: 'U'
  },
  {
    id: 3,
    username: 'gible',
    password: 'DragonBreath443', // Feel free to check out the functions in /src/composables/useEncryption.ts
    roleType: 'U'
  },
  {
    id: 4,
    username: 'dragonair',
    password: 'DragonTail148', // I'd also like users to actually be able to login by looking at this file,  
    roleType: 'M'
  },
  {
    id: 5,
    username: 'gabite',
    password: 'DragonRush444', // ...so I'm keeping them in plain text.
    roleType: 'M'
  },
  {
    id: 6,
    username: 'dragonite',
    password: 'Outrage149', // Also my Git Guardian's gonna complain if I have a high entropy, hashed text here.
    roleType: 'A'
  },
]

export const roles: Array<Role> = [
  {
    id: 1,
    type: 'U',
    name: 'User',
    action: 'manage',
    subject: 'Post',
    field: '["body", "title"]',
    permission: '{ "userId": user.id }'
  },
  {
    id: 2,
    type: 'M',
    name: 'Moderator',
    action: 'manage',
    subject: 'Post',
    field: '',
    permission: '{ "userId": user.id }'
  },
  {
    id: 3,
    type: 'M',
    name: 'Moderator',
    action: 'manage',
    subject: 'User',
    field: '',
    permission: '{ "roleType.type": "U" }'
  },
  {
    id: 4,
    type: 'A',
    name: 'Admin',
    action: 'manage',
    subject: 'all',
    field: '',
    permission: '{}'
  },
  // All users must not be able to delete themselves
]

export const posts: Array<Post> = [
  {
    id: 1,
    title: 'Yama ES, 3rd Grade',
    body: 'Handled third grade today in Yama ES. Class A was pretty rowdy, but Class B was well-behaved, so we were able to cover more.',
    date: '2024-10-09',
    userId: 1
  },
  {
    id: 2,
    title: 'Mizu JHS, 1st Year',
    body: 'The JTE has always been helpful in Mizu JHS, but she was absent today, so I had to lead the class. It wasn\'t too difficult, but it was definitely more challenging without her around to help.',
    date: '2024-10-10',
    userId: 1
  },
  {
    id: 3,
    title: 'Hono ES, 5th Grade',
    body: 'I was supposed to teach in Hono ES today, but classes were cancelled due to the flu season...',
    date: '2024-10-11',
    userId: 2
  },
  {
    id: 4,
    title: 'Sports day',
    body: 'It was sports day in Mizu JHS today, so I just helped out with moving stuff around.',
    date: '2024-10-14',
    userId: 3
  },
  {
    id: 5,
    title: 'Hono ES, 6th Grade',
    body: 'There was a fire drill today, and we had to neatly and orderly line up outside. Other than that, it was business as usual. The sixth graders were easier to handle as they were more behaved.',
    date: '2024-10-15',
    userId: 4
  }
]
