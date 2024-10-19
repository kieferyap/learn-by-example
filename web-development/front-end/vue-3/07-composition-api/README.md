# About
## Objective
To learn about the Composition API:
- Composition API vs Options API
- `data()`, Methods, Computed Properties and Watchers
- Reference Properties
- `ref()`, `reactive()`, `toRefs()`, `isRef()`, `isReactive()`

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
- Instead of dividing our code into `data()`, `methods`, `computed`, and `watch`, they are all in one place called `setup()`
  - `setup()` is called very early in the lifecycle, so you cannot use `this` within `setup()`
  - `setup()` is called only once, when Vue sets up the component
- Rewriting `setup()` over and over can get repetitive, so:
  ```javascript
  <script>
  import { ref } from 'vue'
  export default {
    setup () {
      const username = ref('Test')
      return { username }
    }
  }
  </script>
  ```
  can be written as:
  ```javascript
  <script setup>
  import { ref } from 'vue'
  const username = ref('Test')
  </script>
  ```

## data()
- In Options API, we put our reactive variables in `data()`, but in Compositions API, we write it as `const variable = ref('test')`.
  - To access the variable from within the template, it needs to be returned at the end of the `setup()` function, like so: `return { variable }`
  - From the template, the variable can then be accessed like so: `<input v-model="variable" />`
  - From the JS/TS part of the code though, the reactive variable can be accessed like so: `alert(variable.value)`
  - You cannot access `.value` from within the template
  - `ref()` needs to be imported from `vue`, like so: `import { ref } from 'vue'`
- You can see this in action within [./src/App.vue](./src/App.vue), lines 96-97, 126-127

## methods
- Methods can be written as `const methodName = () => { /* Method body here */ }`
- To access the method from within the template, it needs to be returned as well, like so: `return { methodName }` ([./src/App.vue](./src/App.vue), line 186+)
- You can see this in action within [./src/App.vue](./src/App.vue), lines 102-115

## computed
- Computed Properties are written as `const computedProperty = computed(() => { /* Calculate for the computed property */ })`
- Computed properties are readonly, and cannot be manually assigned a new value. (i.e.: You cannot do `computedProperty.value`)
- You can see this in action within [./src/App.vue](./src/App.vue), lines 118-123
- `computed()` needs to be imported from `vue`, like so: `import { computed } from 'vue'`

## watch
- Watchers are written as `watch(variableBeingWatched, (newValue, oldValue) => {})`
  - It is possible to specify multiple variables to be watched, like so:
  ```javascript
  watch([variableName, anotherVariable], (newValues, oldValues) => {
    // variableName's new and old values
    console.log(newValues[0])
    console.log(oldValues[0])
    
    // anotherVariable's new and old values
    console.log(newValues[1])
    console.log(oldValues[1])
  })
  ```
  - In the above example, the watcher is triggered when *either* `variableName` *or* `anotherVariable` changes.
- You can see this in action within [./src/App.vue](./src/App.vue), lines 129-161
- `watch()` needs to be imported from `vue`, like so: `import { watch } from 'vue'`

## ref() vs reactive()
- Both `ref()` and `reactive()` make a variable reactive, however:
  - `ref()` works with objects (`ref({})`), strings (`ref('')`), numbers (`ref(0)`), etc.
  - `reactive()` only works with objects. See [./src/App.vue](./src/App.vue), lines 164-173
- There is also a slight difference when it comes to accessing the variables within the JS/TS code:
  - `const variable = ref({ name: 'Brok' })` can be accessed with `variable.value.name`
  - `const variable = reactive({ name: 'Brok' })` can be accessed with `variable.name`
- In both cases however:
  - `variable` is reactive, but `variable.name` (or `variable.value.name`) is not.
  - Object properties can be accessed **within the template** as `variable.name`.
- To make a reactive object's properties all reactive, we use `toRefs()`

## toRefs()
- Suppose we have a `reactive()` object:
```javascript
const fullName = reactive({
  first: '',
  middle: '',
  last: ''
})
```
- In the above code, `fullName` is reactive, but `fullName.first` is not.
- If we want to make the `first`, `middle`, and `last` properties reactive, all we have to do is: 
```javascript
const fullNameRefs = toRefs(user)
```
- After doing so, its properties are now reactive (and can be accessed as, `fullNameRefs.first.value`)  

## Reference Properties
- Suppose that, in the template, you have the following code: `<input ref="inputName" />`
- Accessing it within JS/TS can be done like so:
  ```javascript
  const username = ref<HTMLInputElement | null>(null)
  // For JS, it's just const username = ref(null)

  function alertUsername() {
    // The first .value accesses ref()
    // The second .value accesses the value property of the input tag
    alert(username.value?.value)
  }

  return {
    username
  }
  ```
- You can see this in action within [./src/App.vue](./src/App.vue), lines 181-185

## Other functions
- `isRef(variableName)`: returns true if the `variableName` is a `ref()`, false if otherwise
- `isReactive(variableName)`: returns true if the `variableName` is a `reactive()`, false if otherwise

## Summary

| Description | Options API | Composition API |
| ----------- | ----------- | --------------- |
| Reactivity | `data() { variable: 'test' }` | `const variable = ref('test')` |
| Methods | `methods: { methodName() {} } ` | `const methodName = () => { /* Method body here */ }` |
| Computed | `computed: { computedProperty() {} } ` | `const computedProperty = computed(() => {})` |
| Watcher | `watch: { variableName (newVal, oldVal) {} } ` | `watch(variableBeingWatched, (newVal, oldVal) => {})` |

# Further Reading
- TypeScript with Composition API: https://vuejs.org/guide/typescript/composition-api.html