# About
## Objective
To learn about the Composition API:
- Composition API vs Options API
- `data()`
- `methods`
- `computed`
- `watch`
- `ref` vs `reactive`
- Reference properties

## Running the Demo
- Navigate to the `07-composition-cli` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run serve` to run the front end server

# Background
## Options API
- The following way of writing Vue's properties is called the **Options API**
```javascript
const app = Vue.createApp({
  data() {
    return {
      list: [],
      newItem: ''
    }
  },
  methods: {
    addItem() {
      this.list.push(this.newItem)
      this.newItem = ''
    }
  }
})
```

## Problem with Options API
- Code that should be grouped together are distributed into data(), methods, computed, etc.
- On larger applications, this unnecessary code splitting can make things messy and difficult to maintain.
- In addition, reusing logic can be tricky and cumbersome, which makes copy-pasting unavoidable at times.

# Composition API
## Notable changes

## JavaScript and TypeScript

## data()

## methods

## computed

## watch

## ref() vs reactive()

## Reference Properties