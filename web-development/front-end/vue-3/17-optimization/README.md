# About
## Objective
To learn how to optimize your Vue App

## Running the Demo
- Navigate to the `17-optimization` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server
- Run `npx tsx fake-api-server.ts` to run the backend server

# Setup
## Project
These were the commands I ran to start `17-casl`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has the following libraries:

```bash
npm install lodash --save
npm install @types/lodash --save-dev
```

This project is a continuation of the previous one, so for this project to work, feel free to have a look at [../15-stores/README.md](./../15-stores/README.md) and install the appropriate packages.

# Optimization
## About
Let's look into a summary of common optimization techniques in Vue:
- State Management:
  - Using Pinia instead of VueX as Pinia is lighter and faster
  - Avoiding using Pinia for variables that aren't site-wide
  - We are already doing this
- Avoid Unnecessary Renders:
  - Use v-if to conditionally render components instead of v-show
  - Use the `:key` prop to manage re-renders when doing list iteration
  - We are already doing this
- Optimizing Assets:
  - Use Vite to minify and compress JavaScript, CSS, and images
  - We are already doing this
- Memoization:
  - Use computed properties, or libraries like VueUse to memoize values
  - This avoids expensive recalculations, and only recalculates when a dependency changes
  - We are already doing this
- Optimizing Event Handlers:
  - Debounce or throttle frequent events (e.g., scroll, resize).
  - We'll add a search bar in the user list to illustrate this example.
- Prefetching
  - Pre-fetch components or routes when you are absolutely certain that a user will navigate to them soon.
  - We'll pre-fetch the `AppPostInput.vue` component within the `/post/[id]` page to illustrate this example.
- `defineAsyncComponent()`
  - Tells Vue not to load a component on initial load
  - Instead, load it only when needed
  - We *will* be making a few changes to use `defineAsyncComponent` in `17-optimization`

# Optimization Details
## Memoization
Don't do this:
```html
<template>
  <div>
    <input v-model="celsius" />
    <p>Result: {{ calculateFahrenheit() }}</p>
  </div>
</template>
```

Instead, do this:
```html
<template>
  <div>
    <input v-model="celsius" />
    <p>Result: {{ fahrenheit }}</p>
  </div>
</template>
```
```js
const celsius = ref(0)
const fahrenheit = computed(() => {
  return 1.8 * celsius.value + 32
});
```

Reasoning:
- Memoization makes sure that calculations are only performed *when its dependent data changes*
- In the first unoptimized example, `calculateFahrenheit()` is called on every render, even when `celsius` isn't changed, which causes unnecessary recalculations. 

## Optimizing Event Handlers

## Prefetching 

## `defineAsyncComponent()`

# Further reading
- Pinia: https://pinia.vuejs.org/introduction.html
  - Option/Setup Stores: https://pinia.vuejs.org/core-concepts/#Option-Stores
- VueX: https://vuex.vuejs.org
