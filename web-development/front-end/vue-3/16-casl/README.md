# About
## Objective
To learn about CASL
- About CASL
- Setting up CASL
- Retrieving and setting CASL abilities
- Using CASL:
  - Navigation button visibility
  - Page visibility (via URL access)
  - Meta properties and router checks
- User-specific resource visibility

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
- While logging in, the user's ability data is retrieved from the backend. (e.g.: "they can only view their own posts")
- Once retrieved, the cookies are set to contain this ability data.
- CASL is also used to set this retrieved ability data.
- You can see all this in action in [login.vue](./src/pages/login.vue), with the following relevant lines below:
  ```typescript
  // Retrieve the response information
  const { authToken, userData, permissions } = response

  // Set the ability information within the cookie
  setCookie('abilityRules', JSON.stringify(permissions))

  // Use CASL to update the user's abilities
  ability.update(permissions)
  ```
- Suppose that the user has logged in previously and accesses the app.
  - Since we stored the ability information within the cookies, they are retrieved and set with CASL.
  - It is important to note that it is possible to manually edit cookies, so users can potentially give themselves abilities they should not have.
  - Therefore, it is important to take one or more of the following steps to be safe:
    - Verify user abilities in the server
    - Make sure that the server's behavior is consistent with the CASL abilities provided (i.e.: Users who cannot see the delete button in the UI should not be able to delete the resource, even if they somehow make the delete button visible)

# Ability Usage
## Navigation Visibility
- CASL abilities can be used to determine whether certain navigation buttons are visible.
- In this example:
  - The User List should only be visible to users of type: "Moderator" and "Admin"
  - The User List should NOT be visible to users of type: "User"
- This can be done with the method: `ability.can()`
- An example of this in action can be seen in [App.vue](./src/App.vue):
  ```typescript
  import { Action, Subject } from './plugins/casl/ability'
  import { useCaslAbility } from './plugins/casl/useCaslAbility'
  const ability = useCaslAbility()
  ```
  ```html
  <RouterButton
    to="/users"
    v-if="ability.can(Action.Manage, Subject.User)"
    :button="buttonProperties"
    name="Users"
  />
  ```
- Note that abilities are reactive, so if there are any updates to the current ability data (using `ability.update()`), these changes will be reflected immediately

## Page Visibility
- The User List button has been made invisible for users; however, it is still accessible through the URL.
- In other words, users with the role type, "User", can still access the page by typing `http://localhost:5173/users` in the URL.
- To prevent this, we do the following:
  - Declare ability settings within the page by stating that the `users.vue` page has the ability to manage users.
  - Modify the router file such that before the user goes into a new page: we check if the user has the ability to access the page.

### Meta Properties
- Declaring ability settings [users.vue](./src/pages/users.vue)
  ```typescript
  import { definePage } from 'unplugin-vue-router/runtime'
  definePage({
    meta: {
      action: Action.Manage,
      subject: Subject.User
    }
  })
  ```

### Router Checks
- Router checks [router.ts](./src/plugins/router.ts)
  ```typescript
  // Use CASL to determine if page can be navigated to
  const ability = useCaslAbility()
  const action = to.meta.action as Action
  const subject = to.meta.subject as Subject
  
  // If there are no restrictions, immediately allow navigation
  if (!action && !subject) {
    return
  }

  // If page has restrictions, only allow navigation if user has permission
  if (ability.can(action, subject)) {
    return
  } 
  
  // User has no permission: redirect to 404
  else {
    return '/not-found/404'
  }
  ```

## Post Visibility
- Feature explanation:
  - A user should only be able to see their *very own* posts.
  - They should not be able to see the posts of other people.
- To do that, we:
  - Write down the permission data in the database.
  - We retrieve the permission data.
  - We add a check to make sure that they can only see their own posts.
- Database values:
  ```typescript
  {
    id: 1,
    type: 'U',
    name: 'User',
    action: 'manage', // They can manage...
    subject: 'Post', // their own posts...
    field: '["body", "title"]', 
    permission: '{ "userId": user.id }' // ...but only if it's their own.
  },
  ```
- This permission data is then retrieved on log in and is set in the ability.
- Finally, we add a permission check in [/src/pages/posts/[id].vue](./src/pages/posts/[id].vue), like so:
  ```typescript
  const ability = useCaslAbility()
  const response = await Post.find(id.value)
  const responsePost = 'data' in response ? response.data : response

  if (ability.can(Action.Manage, responsePost)) {
    post.value = 'data' in response ? response.data : response
  } else {
    router.push('/not-found/404')
  }
  ```

# Further reading
- Pinia: https://pinia.vuejs.org/introduction.html
  - Option/Setup Stores: https://pinia.vuejs.org/core-concepts/#Option-Stores
- VueX: https://vuex.vuejs.org
