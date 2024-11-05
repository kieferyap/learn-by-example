# About
## Objective
To learn about CASL

## Running the Demo
- Navigate to the `16-casl` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server
- Run `npx tsx fake-api-server.ts` to run the backend server

# Setup
## Project
These were the commands I ran to start `16-casl`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has `casl`:

```bash
npm install @casl/ability @casl/vue
```

This project is a continuation of the previous one, so for this project to work, feel free to have a look at [../15-stores/README.md](./../15-stores/README.md) and install the appropriate packages.

# CASL
## About
- You'll notice that in the previous versions of the project:
  - Upon logging in as dratini, the user can access posts with IDs 1 and 2 (`/posts/1` and `/posts/2`) as it is their own posts
  - However, they can also access the posts of *other people* (e.g.: `/posts/3`)
- There's also the `/users` page, where a list of users are displayed.
  - Navigation-wise, this page should actually be:
    - Inaccessible to users with role User
    - Only be viewable to users who are Moderators or Admins
  - Moderators should be able to delete users with role User
  - Admins should be able to delete users with roles User or Moderator
- This is where CASL comes in.
  - It focuses on giving users the *ability* to be able to do CRUD operations on the app's resources. (e.g.: View Post, Delete User, etc.)

## Setting up
### Importing Into App
- First, we setup the initial ability to be imported into [main.ts](./src/main.ts)
  ```typescript
  // Import CASL's ability plugin
  import { abilitiesPlugin } from '@casl/vue' // Line 3

  // Import the base ability
  import initialAbility from './plugins/casl/initialAbility' // Line 9

  // Register casl and initial ability, lines 18-20
  app.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true
  })
  ```
- `abilitiesPlugin`: provides Vue integration for CASL, without it, you cannot use CASL.
- `initialAbility`: initial set of actions the user is permitted to do within the app.

### Initial Ability
- This file defines the initial ability or rules (actions the users are permitted to do) in the app
- Located in [src/plugins/casl/initialAbility.ts](./src/plugins/casl/initialAbility.ts), contains the following:
  ```typescript
  import { createMongoAbility } from "@casl/ability"
  import useCookie from "../../composables/useCookie"
  import type { Rule } from './ability'

  const { getCookie } = useCookie()
  const abilityRules = getCookie('abilityRules') ?? '{}'
  const userAbilities: Rule[] = JSON.parse(abilityRules)
  const initialAbility = createMongoAbility(userAbilities ?? [])

  export default initialAbility
  ```
- `createMongoAbility`: 
  - Creates an instance of CASL's ability
  - Mainly for constructing MongoDB-like query conditions
    - MongoDB-like conditions: 
      - `conditions: { authorId: 123 }` checks if the authorId is 123.
      - `conditions: { $or: [{ isPublished: false }, { authorId: 123 }] }` checks if isPublished is false OR authorId is 123.
      - `conditions: { views: { $gt: 1000 } }` checks if views are greater than 1000.
    - In comparison, if non-MongoDB-like query conditions were used:
      - `conditions: (post) => post.authorId === 123`, functions would need to be used to make comparisons.
- `getCookie()`:
  - Retrieves any existing cookies where the previously logged in user's abilities are stored.
  - Since it returns a JSON string, we parse it and pass it into `createMongoAbility()` 
  - It is stored in `initialAbility` and exposed for `main.ts` to use.

### Ability.ts
- Located in [/src/plugins/casl/ability.ts](./src/plugins/casl/ability.ts)
- This file defines the actions, subjects, and rules for the users.

### UseCaslAbility.ts
- Located in [/src/plugins/casl/useCaslAbility.ts](./src/plugins/casl/useCaslAbility.ts)
  ```typescript
  import { useAbility } from '@casl/vue'
  import type { ability } from './ability'

  export const useCaslAbility = () => useAbility<typeof ability>()
  ```
- `useAbility`: 
  - A helper function from CASL.
  - Provides reactive access to the ability instance in the app
  - Allows the app to check the abilities in a way that updates reactively when the rules change
- `useCaslAbility`:
  - A custom composable that is a wrapper for `useAbility`
  - Returns the reactive `Ability` when called, which is used to perform permission checks

# Ability Retrieval and Setting
## Login
## Cookies

# Ability Usage
## Navigation Visibility
## Page Visibility
### Meta Properties
### Router Changes
## Post Visibility
## User Management

# Further reading
- Pinia: https://pinia.vuejs.org/introduction.html
  - Option/Setup Stores: https://pinia.vuejs.org/core-concepts/#Option-Stores
- VueX: https://vuex.vuejs.org
