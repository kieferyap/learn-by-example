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

# Further reading
- Pinia: https://pinia.vuejs.org/introduction.html
  - Option/Setup Stores: https://pinia.vuejs.org/core-concepts/#Option-Stores
- VueX: https://vuex.vuejs.org
