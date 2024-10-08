# About
## Objective
- To learn about Vue Components
  - Components
  - Props and Prop Mutation
  - Emitting events
  - Fallthrough properties
  - Bind All

## Running the Demo
- Navigate to the `08-components-props` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run serve` to run the front end server

# Component Introduction
- Back in the previous lesson's [App.vue](./../07-composition-api/src/App.vue), you'll notice that there are blocks of HTML code *that are very similar* (lines 46-48, 51-53, 56-58)
- Components address this problem by providing a way to make... something like a class with *properties*, which can be imported to different parts of the code
- Note that while not seen in the example, it is possible to use directives such as `v-for`, `v-if`, `v-show`, etc., in components
- In the previous lesson's [README.md](./../07-composition-api/README.md), we noted two different ways of writinf the JS/TS portion (See Notable Changes portion). From this lesson onwards, we will be using the following form:
  ```javascript
  <script setup>
  import { ref } from 'vue'
  const username = ref('Test')
  </script>
  ```

# Component Example
- **Relevant files and lines:** 
  - `src/App.vue`: 
    - Line 2: The component `FullNameListInput` is imported into App.vue
    - Lines 37-42: The imported component is used
  - `src/components/FullNameListInput.vue`: 
    - Line 4: The component `ListGroupInput` is imported into FullNameListInput.vue
    - Lines 36-41, 44-49, 52-57: The imported component is used
  - `src/components/ListGroupInput.vue`: 
    - Notice how lines 32-40 is pretty similar to lines 46-48 of the previous lesson's App.vue
- Naming Convention: A rule of thumb is that *multi-word elements* should be used because single-word elements may crash with existing HTML elements
  - Multi-word Elements: `FullNameInput`, `ListGroup`
  - Single-word Element: `Input`, `Span`
  
# Props (Component's Properties)
Props are varibles that are passed from a parent component to a child component.

## Declaring Props
As an example, let's take a look at `src/components/ListGroupInput.vue`: 
- At lines 6-9, we are writing down the properties that this component needs: `inputModel` and `placeholder`
  - Since we are using TypeScript, we explicitly say that these two props are strings
  - Props can be `boolean`, `string`, `number`, or any other type
  - Note that for TypeScript, you can specify that a prop is optional by using the question mark, as seen in line 8.
- At lines 10-13, we are explicitly declaring that `ListGroupInput`'s props are `inputModel` and `placeholder`
  - `withDefaults` does what the name implies: declare the default values for the props.
  - If we don't want to specify its default values, it is possible to omit it, and instead write it as `const props = defineProps<Props>()`
- At this point, we have now specified what the props of the component `ListGroupComponent` will be. Next, it's time to use them.

## Using Props
To see these props being used in action, let's take a look at its parent component, `src/components/FullNameListInput.vue`:
- At line 4, the component is imported.
- Lines 36-41 (and also 44-49, and 52-57) sees the component being used:
  - The props that we declared, `inputModel` and `placeholder` are being used:
    - `placeholder="Last name"`: We are setting the `placeholder` prop to hold the string, "Last Name"
    - `:input-model="last"`: 
      - Note how the multi-word `inputModel` is written in camelCase, but when it is being used, it is written in kebab-case
      - `:input-model` is shorthand for `v-bind:input-model`, and a variable called `last` is being passed into it

## Prop Mutation
- Props should **never be mutated**, that is, they should never be changed within a component.
- This is due to a core Vue concept called *unidirectional data flow*: this means that data passed from parent to child needs to be changed *in the parent component*, and not in the child component.
- If we want to change the value of a prop, we can:
  - Clone the prop's values in the child component, and mutate that clone instead, thereby leaving the prop un-mutated.
  - We can also let the parent know that a prop has changed, and update the value being passed in the parent accordingly
- We can see this cloning in action in `FullNameListInput.vue`:
  - Lines 29-31: The props are being cloned *once*
  - Lines 39, 47, and 55: The cloned props are being used
- Cloning can also be seen in `ListGroupInput.vue`:
  - Line 21: `props.inputModel` is being cloned once into `inputModel`
  - Line 37: The cloned prop is being used
  - Note how we did not clone `props.placeholder` and are just using it as is. That is because it doesn't mutate, and therefore doesn't need to be cloned.
- It was briefly mentioned that it is possible to let the parent know that a prop has changed, which can be done with **Emitters**, which will be tackled in the next section.

# Emitters
- If props are used as a way to communicate from parent components to child components, emitters are used as a way to communicate from child components to parent components.
- You can see this in action in `ListGroupInput.vue`:
  - Lines 16-18: We write down what the component is emitting
    - `changed:value` is the name of the emit
    - `value:NameValue` is the value being passed (its type is `NameValue`, which is an object that has a `name`, which is a `string` and `characterCount`, which is a `number`)
    - `void` is what the emitter function returns. In this case, it doesn't return anything.
  - Line 19: We explicitly declare what the component is emitting
    - Note that it is possible to rewrite lines 16-19 to the following:
      ```javascript
      const emit = defineEmits<{
        (e: "changed:value", value: NameValue): void
      }>()
      ```
    - That `emit` in `const emit` is actually a function, which we will use in lines 23-28.
  - Lines 23-28: We write down the function that calls `emit()`
  - Line 38: We call the function that was written in lines 23-28 every time the user inputs something.
- In the parent component, `FullNameListInput.vue`, we are receiving the emit in lines 40, 48, and 56.
  - `@changed:value` is shorthand for `v-on:changed:value`
  - `$event` contains the values that we are passing, in this case, it contains an object that has `name:string` and `characterCount:number`
    - You can see `$event` being used in App.vue
      - Line 41 passes the entire `$event` object
      - Lines 23-24 makes use of the passed value
  - In lines 21-26, we are declaring what the component emits, just like in lines 16-19 of `ListGroupInput.vue`
- With that, we now know how to use emitters.

# Fallthrough Properties
- Props or events that are set in the parent component are automatically set in the child component's *root* element.
- For instance, in `FullNameListInput.vue`, line 37, we have the property, `class="bg-danger"`.
  - This class "falls through", and is now set in the child component (`ListGroupInput.vue`)'s root element, which is `<li>`
  - This applies to events as well: Suppose you add `@click="console.log('Hello!')"` after `class="bg-danger"`. It falls through to the child component's root element as well: if you click the `<li>`, it should give you the log.

# Bind All
The following code:
```html
  <FullNameListInput 
    :first="fullName.first"
    :middle="fullName.middle"
    :last="fullName.last"
  />
```
can be written as
```html
  <FullNameListInput v-bind="fullName" />
```
This is because when you `v-bind` an object, Vue automatically passes all key-value pairs of the object as props for the component.

You can see this in action in line 38 of App.vue.