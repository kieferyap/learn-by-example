# About
## Objective
To learn about making HTTP requests with ofetch (and vue-api-query)

## Running the Demo
- Navigate to the `13-backend` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server
- Run `npx tsx fake-api-server.ts` to run the back end server

# Setup
## Project
These were the commands I ran to start `13-backend`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has `ofetch`:

```bash
npm install fake-api express
npm install typescript ts-node @types/node @types/express cors
npm install vue-api-query
```

This project also makes use of the routing packages, so if you'd like to install them, feel free to have a look at [../12-routing/README.md](./../12-routing/README.md).

# Libraries Installed
## Fake API
- In a real-world application, you'll probably have a database, and a way to process that data to serve them to the front-end by calling an API.
- With Fake API, you don't need this.
- You can just write the following:
  - Table and column information: [./fake-api/types.ts](./fake-api/types.ts)
  - Data: [./fake-api/data.ts](./fake-api/data.ts)
  - Server to *serve* the data: [./fake-api-server.ts](./fake-api-server.ts)
- You can run this server by going: `npx tsx fake-api-server.ts`
- More information here: https://github.com/BosNaufal/fake-api 

## Vue API Query
- With this library, writing code that communicates with the back-end via REST API is much easier (as opposed to just using fetch)
- As the documentation says, this library makes your code for back-end communication clean and elegant.
- It also matches perfectly with Laravel's [spatie/laravel-query-builder](https://github.com/spatie/laravel-query-builder)
- More information here: https://robsontenorio.github.io/vue-api-query/

# API Summary
| Action | Method | Code Example | Rest API | [fake-api-server.ts](./fake-api-server.ts) |
| ------ | ------ | -------------- | -------- | ------------------------------------------ |
| Create | `.save()` | [AppPostInput.vue](./src/components/AppPostInput.vue):41 | POST /api/posts | Line 102 |
| Read All | `.get()` | [posts/index.vue](./src/pages/posts/index.vue):16 | GET /api/posts | Line 60 |
| Read One | `.find()` | [posts/[id].vue](./src/pages/posts/[id].vue):51 | GET /api/posts/:id| Line 83 |
| Read Including | `.include().get()` | [users.vue](./src/pages/users.vue):12 | GET /api/users?include=roleType| Line 21 |
| Update | `.save()` | [AppPostInput.vue](./src/components/AppPostInput.vue):47 | PUT /api/posts/:id | Line 111 |
| Delete | `.delete()`| [posts/[id].vue](./src/pages/posts/[id].vue):67-68 | DELETE /api/posts/:id | Line 129|

## Model Files
- The Model Files are TypeScript objects that represent the tables in your database.
- They can be found in the folder, [models/](./models/)
- As an example, let's have a look at [user.ts](./models/user.ts):
  - This file represents the users table
  - It contains two parts, both being exported as `User`: 
    - A type object which contains the table's columns
    - A class object which represents the table itself
  - It extends the base model, so that it can call methods like the ones above (`.save()`, `.get()`,  etc)

## Base Model
- This file is located in [/src/base-model.ts](./src/base-model.ts)
- This file specifies the following:
  - `get $http()`: Specifies what to use when communicating with the back-end. In this case, `$api` (which is just `ofetch`) is being used.
  - `baseURL()`: The base URL of the API
  - `request()`: Specifies how to process the request
    - If data is being passed from the front to the back end, it originally was being placed in `config.data`.
    - The back-end, using fake-api, is looking for the data within `config.body` (see [fake-api-server.ts](./fake-api-server.ts):103 and 112)
    - Therefore, the data processing within `request()` involves moving data from `.data` (if it exists) to `.body` before sending it to the back-end

# Further reading:
- Vue API Query: https://robsontenorio.github.io/vue-api-query/
- Fake API: https://www.npmjs.com/package/fake-api
