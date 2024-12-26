# About
## Objective
To learn about composables
- What they are
- How to use them

## Running the Demo
- Navigate to the `14-composables` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server
- Run `npx tsx fake-api-server.ts` to run the backend server

# Setup
## Project
These were the commands I ran to start `14-composables`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has `cookie-es`:

```bash
npm install cookie-es bcryptjs
```

This project also makes use of the routing and backend communication packages, so if you'd like to install them, feel free to have a look at [../13-routing/README.md](./../13-routing/README.md).

# Composables
- What are they?
  - Composables are basically snippets of code that are usable by the entire app.
  - These can be repeating functions (methods, watchers, etc.) that can be used in different components
- As a convention, they usually start with the prefix `use`.
- While not shown in this app, there are cases where the following occurs:
  - A composable has a function that accepts an array.
  - A component calls the function, and passes an array.
  - However, another component calls the same function, but passes a `ref` of an array.
  - In that case, you can do the following:
    - Make the function within the composable accept the ref of an array, and use `toRefs` to turn the array into a `Ref<Array<T>>` to make it more consistent.
    - OR, if the array is readonly (and not modified), you can unwrap the `ref` by accessing its `.value`

# Examples of Composables
| Composable | Purpose | Places Used | 
| ---------- | ------- | ----------- | 
| [useApi.ts](./src/composables/useApi.ts) | To use `ofetch` to make HTTP requests | [base-model.ts](./src/base-model.ts) and [login.vue](./src/pages/login.vue) |
| [useCookie.ts](./src/composables/useCookie.ts) | To manage cookies (`get`/`setCookie()`, etc.) | [App.vue](./src/App.vue), [router.ts](./src/router.ts) and [login.vue](./src/pages/login.vue) |
| [useEncryption.ts](./src/composables/useEncryption.ts) | For encrypting and decrypting strings using `bcrypt` | None (see note 1) |

## Composable Notes
1. `useEncryption.ts` can be used to encrypt and decrypt passwords for logging in. You can try modifying [fake-api-server.ts](./fake-api-server.ts), line 157 to make use of this.
2. `useCookie.ts` has three functions: `getCookie()`, `setCookie()`, and `deleteCookie()`
3. `getCookie()` is used to check if the user is logged in. (See [router.ts](./src/router.ts), line 32)

# Further reading
- Vue Composables: https://vuejs.org/guide/reusability/composables.html
