# About
## Objective
To learn about routing with Unpluggin Vue Router
- A basic transition
- Transition class prefixes
- Transitioning multiple elements
- Transition Group

## Running the Demo
- Navigate to the `12-routing` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server

# Setup
## Project
These were the commands I ran to start `12-routing`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has `unplugin-vue-router`:

Run the following to create a VITE project and follow the instructions.
```bash
npm create vite@latest
```

Install unplugin-vue-router (The `-D` flag stands for "devDependency", meaning, the package is needed only for dev builds and not for production)
```bash
npm install vue-router
npm install -D unplugin-vue-router
npm install -D unplugin-auto-import
```

## Project files
The following files need to be modified to look like the ones in this project:
- [vite.config.ts](./vite.config.ts)
- [tsconfig.json](./tsconfig.json)
- [src/router.ts](./src/router.ts)
- [src/main.ts](./src/main.ts)

Finally, create `src/pages/posts/[id].vue` and `src/pages/posts/index.vue` and run the following:
```bash
npm run dev
```

You should see the routes file, [typed-router.d.ts](./typed-router.d.ts) auto-generated with routes representing the Vue pages that were just created.

# Background
- We installed three packages:
  - `vue-router`: a routing package maintained by the official Vue dev team
  - `unplugin-vue-router`: an automatic file-based routing package for Vue with TypeScript support
  - `unplugin-auto-import`: a package for automatically importing other packages on demand, also with TypeScript support
- Routing addresses the following problem:
  - In a single-page application, the URL does not change.
  - We want to make it so that the URL *does* change when visiting different pages within the app
  - We also want to make it so that the URL can be shared to other people

# Router File
## Intro to the Router File
- At [main.ts](./src/main.ts), notice the following lines:
  - Line 4, `import router from './router'`, imports the router file.
  - Line 8, `app.use(router)` uses the router file.
- The router file ([router.ts](./src/router.ts)) is where all the routing magic happens, so we shall break it down over the course of this document.

## Router File: createRouter()
In [router.ts](./src/router.ts), line 5, we are calling the `createRouter()` function, which takes in an object.

### History
`history` ([router.ts](./src/router.ts), line 6): Tells the router how to manage routing history, and has two main modes and a memory mode:
- `createWebHashHistory()`:
  - Uses a hash character (#) before the URL is internally passed
  - Has a bad impact in SEO. 
  - It is apparently only used in special cases such as legacy browser support or local prototyping with no server-side support.
- `createWebHistory()`:
  - The **recommended** mode (according to the [docs](https://router.vuejs.org/guide/essentials/history-mode.html))
  - The one we shall be using
- `createMemoryHistory()`: 
  - Doesn't assume that there is a browser environment
  - Perfect for Node Environment and SSR, and recommended for browser applications. 
  - There won't be any history though, so you can't move forward or backward.

### Scroll Behavior
`scrollBehavior(to, from, savedPosition)` ([router.ts](./src/router.ts), line 9-18): tells the router where to auto-scroll whenever we go from one page to another.
  - Use case:
    - Suppose a user scrolls up to a point in `/post/1`
    - The user then clicks a link, which leads to `/user/1`
    - The user goes back to `/post/1`
    - With `scrollBehavior`, the browser automatically scrolls to the point where they left
  - Parameters:
    - `to`: A route object that contains information on where the user is going to
    - `from`: A route object that contains information on where the user is coming from
    - `savedPosition`: An object containing the scroll information (has the properties `left` and `top`)
  - Notice how we are using `_` and `_2`: it is to make your IDE *not* complain that there are unused parameters. If you replace them with `to` and `from`, you'll notice that they are grayed out.

### Routes
- ([router.ts](./src/router.ts), line 20): 
  - Contains an array which tells the router what which component to load given a URL.
  - "If the user enters the URL, `https://site.com/teams/1`", render the following component: `teams.vue`
  - As for what this array contains specifically, I'll dive into more detail later on.

### Navigation Guards:
- `router.beforeEach(to => {...})`([router.ts](./src/router.ts), line 24-49):
  - Pretty much like a police officer telling the user, "Nope, you're not logged in so you can't enter this page", or, "Sure, you may enter."
  - The `beforeEach()` function is called before each navigation action is called (i.e.: every time before the user changes routes)
- Within `beforeEach()`, we are doing the following:
  - Line 27: Check the page: if it's a public page that requires no login, let the user pass.
  - Line 31: Check if the user is logged in (We should be using cookies to determine whether the user is logged in or not, but for now, let's use a raw boolean value)
  - Line 34: Check the page: if it's a page for the unauthenticated (e.g.: `/login` or `/signup`)
    - If the user is already logged in anyway, there's no point in reaccessing the login page, so redirect them to the homepage.
    - If the user isn't logged in, then let the user pass
  - Line 44: If the user is not logged in, and is trying to access a non-public page, then redirect them to the login page
  - Line 49: Allow the navigation (the user is logged in and is trying to access a page within the site)
    - What if the user is trying to access a resource that is not theirs? (i.e.: User tries to access the private details of another user)
    - This is where CASL comes in, and will be covered in a later lesson.
