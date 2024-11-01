# About
## Objective
To learn about Stores (with Pinia)
- Intro to Stores
- Stores with Pinia
- Store Creation
- Data Retrieval
- Data Update
- Types of Stores

## Running the Demo
- Navigate to the `15-stores` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server
- Run `npx tsx fake-api-server.ts` to run the backend server

# Setup
## Project
These were the commands I ran to start `15-stores`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has `cookie-es`:

```bash
npm install pinia
```

This project is a continuation of the previous one, so for this project to work, feel free to have a look at [../14-composables/README.md](./../14-composables/README.md) and install the appropriate packages.

# Stores
## About
- The problem Stores are trying to solve:
  - Passing data between components is usually handled through `props`, `events`, `provide` and `inject`.
  - This works fine for smaller projects, but it can get very messy and difficult to maintain in larger apps.
- How Stores solves this problem:
  - A Store provides a **centralized, consistent pool of data** that any component can access or update, without the need for `props`/`events`
  - This makes the code easier to understand and maintain, as you won't have to track where the data is going.
- Sample use cases for using a Store:
  - Storing the username of the logged in user, to be accessed anywhere within the app.
  - Storing what's currently inside of the user's shopping cart

## Key Concepts
- **State**: 
  - The core data that is shared across components
  - e.g.: number of items stored in the shopping cart
- **Getters**: 
  - Kind of like computed properties for the data within the state
  - e.g.: gets the total price of all the items in the cart
- **Actions**:
  - Special asynchronous functions (like fetching data)
  - e.g.: adding an item into the cart calls the server to update the DB
- **Mutations**
  - Functions that change the state directly
  - e.g.: deleting an item from the cart
  - Note: Pinia does not use mutations

## Pinia?
VueX used to be the traditional state management library for Vue. However, Pinia is now the more prefered alternative. 

| Criteria | VueX | Pinia |
|----------|------|-------|
| Syntax/API | Verbose and rigid, requiring explicit definitions for `state`, `getters`, etc | More intuitive and flexible API, inspired by Composition API, making code easier to write/maintain |
| Vue3 | Originally made for Vue2, and doesn't use Vue3 features efficiently | Specifically designed for Vue3, making use of reactivity, integrates with Vue DevTools |
| TypeScript | Cumbersome and requires more boilerplate code, requires extra setup | Support provided out of the box, IDE-friendly |

# Usage
## Store Creation
- We create a store to be used in the app.
- You can see an example of a store that was created in [useUserStore.ts](./src/stores/useUserStore.ts)
  ```typescript
  import { defineStore } from 'pinia'

  export const useUserStore = defineStore('user', () => {
    const id = ref(0)
    const username = ref('')
    const role = ref(RoleType.User)

    return {
      id,
      username,
      role
    }
  })
  ```
- As you can see, we call `defineStore()`:
  - We pass in a unique name for the store as the first parameter
    - The unique name is pretty much that word between `use` and `Store` in camel case (`useUserStore` ➡ `'user'`)
  - We pass in a function as the second parameter
    - The function is pretty similar to a `composable`
    - We declare variables as states that need to be taken note of (In our case it's `id`, `username`, and `role`)
    - and we `return` them to make them available for components that will use them

## Data Retrieval
Let's look at sample code where data from the store is retrieved:
- [App.vue](./src/App.vue)
  ```typescript
  // The store is imported (line 3)
  import { useUserStore } from './stores/useUserStore'

  // The store is called (line 11)
  const userStore = useUserStore()
  ```
  ```html
  <!-- Retrieving the ID from the store -->
  <div class="row" v-if="userStore.id">
    <h4 class="col-12 text-secondary">

      <!-- Retrieving the username from the store -->
      Welcome, {{ userStore.username }}
    </h4>
  </div>
  ```

## Data Update
Now, let's look at sample code where data from the store is updated:
- [settings.vue](./src/pages/settings.vue)
  ```typescript
  import { useUserStore } from './../stores/useUserStore'
  const userStore = useUserStore()

  // Update store
  userStore.username = username.value
  ```
Note that due to the reactive nature of Pinia's store, that `{{ userStore.username }}` from the Data Retrieval portion will automatically be updated.

## Types of Stores
Options Stores
- Structured similar to VueX, where `state`, `getters`, and `actions` are declared explicitly
- Beneficial when you want a clear distinction between different parts of the store

Setup Stores
- Inspired by Composition API, where `ref`, `reactive`, `computed`, etc., are available for use
- Allows for higher flexibility and is what we are using in this example

# Further reading
- Pinia: https://pinia.vuejs.org/introduction.html
  - Option/Setup Stores: https://pinia.vuejs.org/core-concepts/#Option-Stores
- VueX: https://vuex.vuejs.org
