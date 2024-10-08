# About
## Objective
To learn about Slots and Teleport
- Slots and Scoped Slots
- Teleport

## Running the Demo
- Navigate to the `10-slots-teleport` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run serve` to run the front end server

# Slots
## Background
- To pass data from parent components to child components, we use `props`.
- However, with `props`, we can only pass single type values (e.g.: `strings`, `numbers`, etc) or objects.
- If we need to pass blocks of HTML code, `props` alone would not suffice.
- This is where `slots` come in.

## AppLoading.vue
- [AppLoading.vue](./src/components/AppLoading.vue) is a component that does a few things:
  - It accepts a `prop` called `isLoading`, which, if `true`, displays a loading screen.
  - Once `isLoading` is `false` (this flag is controlled by its parent, [App.vue](./src/App.vue)):
    - It hides the loading screen, and
    - It shows the main content
  - It also shows the loading percentage, if available.
- To do the things above, [AppLoading.vue](./src/components/AppLoading.vue) makes use of *three* slots.
  - Line 26: the `loading-text` slot allows the "Now loading..." text to be customized in both text and style.
  - Line 33: the default slot, which contains the main content once loading is done.
  - Line 47: the `progress` slot, which allows the progress to be displayed. (i.e. this can be in the form of a progress bar, just plain text, etc.)
- The `<AppLoading>` component is used in [App.vue](./src/App.vue):
  - Line 33: shows only the default slot being used
  - Line 44: the default and the `loading-text` slots are being used
  - Line 56: The `progress` slot is being used

## Default Slot
[App.vue](./src/App.vue), lines 33-41:
```HTML
<AppLoading
  :is-loading="isLoading"
  variant="primary"
>
  All done!
</AppLoading>
```
- To *declare* a default slot, simply write `<slot></slot>`. You can see this in action in [AppLoading.vue](./src/components/AppLoading.vue), line 33.
  - The block of code within the `<slot></slot>` tags are the default HTML code, which will be rendered if the slot is unused.
- To *use* the default slot, you can either:
  - Write it in between the component tags, like in the code above, App.vue lines 33-41
  - or you can encase it between the following tags: `<template #default></template>` (App.vue, lines 49-51)

## Named Slots
- To *declare* a named slot, write `<slot name="name-of-slot"></slot>`. You can see this in action in [AppLoading.vue](./src/components/AppLoading.vue), line 26.
- To *use* a named slot, encase your HTML code in `<template #loading-text></template>`. See App.vue, lines 46-48.

## Slot Existence
- In [AppLoading.vue](./src/components/AppLoading.vue) line 41, we have an if-statement checking if the `progress` slot is being used by its parent.
- If we remove this if-statement, then the div is rendered whether or not the `progress` slot is being used
- We can check if the slot is being used through the `$slots` variable (e.g.: `$slots.progress`, where `progress` is the name of the slot)
- `$slots` is an object that contains the component's list of slots. The default, nameless slot can be accessed with `$slots.default`.

## Scoped Slots
### Background
- Suppose a child component has certain data that only it can access.
- However, a parent component wants to use this data within a slot.
- For a more concrete example, let's look at FullNameInput.vue and App.vue.

### FullNameInput.vue and App.vue
- [FullNameInput.vue](./src/components/FullNameInput.vue) does the following:
  - It displays three textboxes: one for first name, one for middle name, and one for last name
  - The reactive variables for the textboxes are within FullNameInput.vue, and are not available to its parent component, App.vue.
- [App.vue](./src/App.vue), the parent component, wants to:
  - Use FullNameInput's default slot to display the fullname in the following format: "(LastName), (FirstName) (MiddleInitial)."
  - However, it does not have access to FullNameInput's reactive variables.
- This is where Scoped Slots come in.

### Scoped Slots
- To *declare* scoped slots, write in its data within `<slot>` as properties. `<slot :propertyName="variableName">`
  - You can see this in action in [FullNameInput.vue](./src/components/FullNameInput.vue), lines 32-36.
- To *use* scoped slots, do the following:
  - Within the `<template>` where the slot is being used, write in `<template #default="slotProps">`, where:
    - `default` is the name of the slot
    - `slotProps` is the name of the object where a scoped slot's properties can be accessed, like so: `slotProps.propertyName`
  - You can see this in action in [App.vue](./src/App.vue), lines 76-80.

# Teleport
- The teleport tag:
  - Accepts one property: `to`, which is a string containing the CSS selector 

