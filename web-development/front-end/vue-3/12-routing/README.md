# About
## Objective
To learn about routing with Unpluggin Vue Router
- Router File
- Scroll Behavior
- Route Array
- Navigation Guards
- Unplugin Vue Router
  - File-based Routing
  - Catch-all Routes
- Router View
- Router Link
- Nested Routes
- Routing Programmatically
- Same Path Routing
- definePage() 

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

# Routes Array: Unplugin Vue Router
## About
- The `routes` array contains the following:
  - `path`: the URL path (e.g.: `'/login'`)
  - `component`: the name of the component to load given the path
  - `props`: a boolean value, which if true, loads any parameters to the path as props (e.g. the `1` in `/posts/1` can be accessed as a prop)
  - `children`: an array about a route's children (e.g.: `/posts/new` is a child of `/posts/`)
  - `query`: any accepted optional query parameters (e.g.: `{ sort: 'asc' }`)
- Maintaining this array can be very tedious, cumbersome, and mistake-prone.
- This is where the `unplugin-vue-router` library comes in.

## File-based Routing
- This plugin checks for the files within [/src/pages](./src/pages/).
- It then builds a routes array depending on the file structure, the result of which can be seen in [/typed-router.ts](./typed-router.d.ts).
- In our case, the following file structure:
```
src/pages/
├── [...error].vue
├── index.vue
├── index@footer.vue
├── login.vue
├── posts.vue
├── users.vue
└── posts/
    ├── [id].vue
    ├── [id]@footer.vue
    ├── index.vue
    ├── index@footer.vue
    └── new.vue
```
- ...generates the following routes:

| Route | Component(s) Rendered |
| ----------- | ----------- | 
| `/` | [src/pages/index.vue](./src/pages/index.vue) |
| `/login` | [src/pages/login.vue](./src/pages/login.vue) |
| `/posts` | [src/pages/posts.vue](./src/pages/posts.vue) which loads [src/pages/posts/index.vue](./src/pages/posts/index.vue)  |
| `/posts/` | [src/pages/posts.vue](./src/pages/posts.vue) which loads [src/pages/posts/index.vue](./src/pages/posts/index.vue)  |
| `/posts/[id]` | [src/pages/posts.vue](./src/pages/posts.vue) which loads [src/pages/posts/[id].vue](./src/pages/posts/[id].vue)  |
| `/posts/new` | [src/pages/posts.vue](./src/pages/posts.vue) which loads [src/pages/posts/index.vue](./src/pages/posts/new.vue)  |
| `/users` | [src/pages/users.vue](./src/pages/users.vue) |
| `/*` | [src/pages/[...error].vue](./src/pages/[...error].vue]) |

## Catch-All Routes
- Files with the name formattted in the following way: `[...error].vue`, where `error` can be any string, will be considered as a catch-all route by the unplugin-vue-router.
- This means that if the user goes to the page like `/this-page-does-not-exist`, it will render `[...error].vue`
- By this logic, if we were to create the following file: `src/pages/posts/[...dne].vue`, then:
  - If the user goes to the page like `/posts/test-page`, then `src/pages/posts/[...dne].vue` will be rendered

# Router Views and Router Links
## Router View
- In the Router File, we have a `routes` array where we specify which component to load given the URL.
- The `<router-view>` tag tells Vue *where* to load the component.
- You can see this in action in [App.vue](./src/App.vue), line 29 and 34.
  - It has a `name` property, which is sort of like a tag on the `<router-view>`
  - In our case, we have a default `<router-view>` at line 29, and a **footer** `<router-view>` at line 34.

## Nested Routes
- You can the above Router Views see this in action in [src/pages/posts.vue](./src/pages/posts.vue), which also has two router views: 
  - a default, nameless one 
  - and a footer one.
- When the user goes to `/posts/`, the following happens:
  - [App.vue](./src/App.vue) is first rendered, and it sees the nameless/default `<router-view>`
    - [src/pages/posts.vue](./src/pages/posts.vue) is rendered next, and it sees another nameless `<router-view>`
    - [src/pages/posts/index.vue](./src/pages/posts/index.vue) is rendered within the nameless `<router-view>` within posts.vue, which is within App.vue
  - Within [App.vue](./src/App.vue), there's another `<router-view>`, this time with the name: **footer**, at line 34.
    - [src/pages/posts.vue](./src/pages/posts.vue) is rendered next, and it sees another *footer* `<router-view>`
    - [src/pages/posts/index@footer.vue](./src/pages/posts/index@footer.vue) is rendered within the footer `<router-view>` within posts.vue, which is within App.vue

## Router Link
- A Router Link is a *special* kind of `<a>` tag, and is rendered as an `<a>` tag in the DOM.
  - Clicking a Router Link navigates you to a page within the site...
    - ...but it doesn't reload the entire page.
    - It only reloads one portion of the site: the affected `<router-view>` portion.
  - If you instead use an `<a>` tag instead of a `<router-link>`, the entire page refreshes
- You can see this in action within [RouterButton.vue](./src/components/RouterButton.vue), and it has the following notable properties:
  - `to`: a required string (or an object) denoting the route it will go to when clicked
  - `tag`: an optional string that denotes what type of object it will render (the default is `<a>`)
    - Try experimenting by changing the `tag` property and then inspecting the element to see what kind of element it is rendering.
- There are two classes that are added to the tag, depending on the URL:
  - `router-link-exact-active`: is added to the tag if the URL completely matches the `to` parameter.
  - `router-link-active`: is added to the tag if the URL is in a nested route.
  - You can see this in action within the CSS portion of the [RouterButton.vue](./src/components/RouterButton.vue) (Lines 20-29) where we are setting the following rules:
    - The `router-link-exact-active` class will have a finger added to the start of the button
    - The `router-link-active` class will have its background turned blue and its text turned white

## Routing Programmatically
- Router links are not the only tools we can use to move from one page to another within the site.
- It is possible to move from one part to another programmatically.
- You can see this in action within [src/pages/posts/index.vue](./src/pages/posts/index.vue), lines 6-11
  ```typescript
  const router = useRouter()

  // Programmatic routing
  const newPost = function () {
    router.push('/posts/new')
  }
  ```

# Same Path Routing
- Suppose the user is in `/posts/1`, and wants to navigate to `/posts/2` by clicking the "Next" button within the page.
  - In this case, the navigation fails. We get stuck in the same page.
  - This is because `/posts/1` and `/posts/2` are both the *same route*.
  - If you look at the table above, both of them are in the `/posts/[id]` route.
  - Since they are in the same route, the page does not get updated.
- So how do we update the page? There are two possible solutions:
  - We use `watch()` to keep an eye out on the `route` variable: if it changes, we take note of the new ID and retrieve the appropriate values. ([/src/pages/posts/[id].vue](./src/pages/posts/[id].vue), line 18-22)
  - OR we can use `onBeforeRouteUpdate(updateGuard)`, because as the name implies, this function gets triggered before the route gets updated, and we can use the `updateGuard` parameter to take note of the new ID. ([/src/pages/posts/[id].vue](./src/pages/posts/[id].vue), line 24-31)

# Routing-related Code
- You'll notice that the code within [/src/components](./src/components/) are mostly focused on displaying data.
  - [AppCard.vue](./src/components/AppCard.vue): focuses on showing a title and its content by surrounding it in a shadowed box with rounded corners.
  - [AppPost.vue](./src/components/AppPost.vue): focuses on showing a post's details (title, body, date)
  - Unless the component is specifically routing-related like [RouterButton.vue](./src/components/RouterButton.vue), it is best to move routing-related code to files within [/src/pages/](./src/pages/)

# Metadata
- Metadata is additional data attached to the page to tell the router specific information about the page.
- You can see metadata in action within:
  - [[...error].vue](./src/pages/[...error].vue), line 7: we tell the router that this is a public page -- a page that anybody can access.
  - [login.vue](./src/pages/login.vue), line 5: we tell the router that this is an unauthenticated page -- a page that can only be accessed by people who aren't authenticated
- You can also see the declared metadata being used in [router.ts](./src/router.ts)

# definePage()
- You might've noticed that there was a method called `definePage()` inside [[...error].vue](./src/pages/[...error].vue). It accepts an object that has the following properties:
  - `alias`
    - Provides an alternate URL path for a route
    - If `users.vue` had an alias of `/people`, then accessing both `/people` and `/users` would render `users.vue`
  - `meta`
    - Stores additional information about the route, to be accessed by navigation guards
  - `path`
    - A string used for overriding the default path
    - `users.vue` has a default path of `/users`. If it's `path` is `/person` then it can no longer be accessed via `/users`, and instead, be only accessible via `/person`
  - `props`
    - A boolean value which allows route parameters to be passed as props to the component
  - `redirect`
    - A string denoting which other route to automatically redirect to
  - `beforeEnter(to, from, next)`
    - A navigation guard that applies only to a specific page.
    - This navigation guard is executed after the global `beforeEach`
    - You can see this in action within [users.vue](./src/pages/users.vue)

# Further Reading
- Vue Router documentation: https://router.vuejs.org/guide/
- unplugin-vue-router documentation: https://uvr.esm.is/introduction.html

