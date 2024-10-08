# About
## Objective
- To learn about:
  - Provide
  - Inject
  - Dynamic Components

## Running the Demo
- Navigate to the `09-provide-inject` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run serve` to run the front end server

# Provide
## Background
- Suppose we have three components:
  - A component ([App.vue](./src/App.vue), which calls a child component in line 47)
  - A child component ([BorderedFullName.vue](./src/components/BorderedFullName.vue), which calls another child component in line 7)
  - and a grandchild component ([ListGroupInput.vue](./src/components/ListGroupInput.vue), which takes in data from App.vue)
- In the previous lesson, we used `props` and `emit` to pass data vertically in the component tree: 
  - We used `props` to pass data downwards, from a parent component to a child component.
  - We used `emit` to pass data upwards, to alert a parent component from a child component.
- If we have a long chain of components, and data needs to be passed through several components, using just `props` and `emit` can be tedious.

## Usage
- `provide` solves this problem, as it *provides* data to a component's descendants.
- It takes in two arguments:
  - **Injection Key**: it can be a string or a Symbol (The string is in kebab-case)
  - **Value**: the value to be made available to the descendants
- You can see this in action in [App.vue](./src/App.vue)
  - Line 28: A string housing the word "Test" is made available to its component descendants
  - Lines 29-31: 
    - The reactive values of `firstName`, `middleName`, and `lastName` are made available
    - Since the provided values are reactive, a way to update these values without using `emit` is needed
    - As such, their respective setter functions, `updateFirst`, `updateMiddle`, and `updateLast` are passed as well.
- It is possible to make the provided data read-only, which bars it from being updated by doing the following: `provide('read-only-variable', readonly(variable))`

## App-wide Provide
- It is possible to use `provide` in such a way that it makes values available to the entire application.
- This can be done by doing `app.provide()` within [main.ts](./src/main.ts) (see line 6)

# Inject
- `inject` allows child components to access values provided by `provide`
- If the value provided by `provide` is reactive, it will **not** be unwrapped. Meaning, `.value` is needed to access the value within it.
- It takes in one required argument and one optional argument:
  - **Injection Key**: the required argument, which tells `inject` what value to look for.
  - **Default value**: the optional second argument, which tells `inject` to use this argument in case the injection key is not found
- You can see `inject` in action in:
  - [FullNameListInput.vue](./src/components/FullNameListInput.vue), lines 6-8.
  - [ListGroupInput.vue](./src/components/ListGroupInput.vue), line 32.

# Dynamic Components
- Up to now, we have created components by explicitly stating what they are (e.g.: the `<FullNameListInput />` component, or the `<ListGroupInput />` component.)
- If we need to create a component that can be changed on the fly, we need to use Dynamic Components by doing the following: `<Component :is="variableName" />`
- You can see this in action in [ComponentSelector.vue](./src/components/ComponentSelector.vue), lines 38-41, where the value of a dropdown is being used to determine what the component will be.
- You'll notice that in lines 37 and 42 of the same file, we are surrounding the `<Component />` inside `<KeepAlive></KeepAlive>` tags.
  - By default, Vue unmounts a component when it is switched away from.
  - This means that if you enter some text within one component, and THEN `<Component />` turns into another component, the text that was entered will disappear.
  - However, if it is surrounded by `<KeepAlive>`, then the component is cached instead of being unmounted, retaining the data (v-models within the component) that was entered.

# Provide/Inject vs Props/Slots: Usage Guide
- The problem with using Provide/Inject too much is maintainability. Using it too much can make the code difficult to understand and maintain.
- Therefore, our go-to for passing information between components should be via `props` and `emit` (See [08-components-props](./../08-components-props/))
- However, provide/inject shines most when data needs to be passed up and down repeatedly between several nodes within the component tree.