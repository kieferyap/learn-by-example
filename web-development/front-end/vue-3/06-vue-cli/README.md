# About
## Objective
To learn about Vue CLI:
- What does it try to solve?
- How to install, setup and use the Vue CLI.
- What does a project made via Vue CLI look like?

## Running the Demo
- Navigate to the `06-vue-cli` directory in your command line
- Run `npm install` (or `yarn add`) to install dependencies
- Run `npm run serve` (or `yarn dev`) to run the front end server

# Vue CLI
## Current Setup Problems
- Our current setup involves one HTML file and one JS file.
- This works for learning the concepts and ropes, but it is impractical for large-scale applications
- The webpage is loaded as a file (`file:///` in the address bar), and not via `https://`

## Vue CLI Objectives
- Ability to split code into multiple sections and use modern features like ES Modules
- Auto-detect changes in the code base and reload only that portion automatically to save time
- Have better IDE support (autocompletion features, warnings, errors, etc.)
- Have better package management support

## Vue CLI Information
- It was made, and is being managed, by the Vue Team
- It is a tool (more precisely, a front-end server) that tries to fulfill the objectives above

## Installing the CLI
- **Installing Node and NPM**
  - See the official site: [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)
- **Installing vue**: 
  - Windows: `npm install -g @vue/cli`
  - Mac: `npm install -g @vue/cli`
  - Linux: `sudo npm install -g @vue/cli`

## Creating a project
- In the terminal/command line, enter: `vue create app-name`
- You'll be prompted to pick a preset, so pick "Manually select features".
```
Vue CLI v5.0.8
? Please pick a preset: 
  Default ([Vue 3] babel, eslint) 
  Default ([Vue 2] babel, eslint) 
❯ Manually select features 
```
- Uncheck everything with the arrow keys and space, and select TypeScript
```
Vue CLI v5.0.8
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to 
proceed)
 ◯ Babel
❯◉ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◯ Router
 ◯ Vuex
 ◯ CSS Pre-processors
 ◯ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```
- Next, choose 3.x when prompted to choose the Vue version.
```
? Choose a version of Vue.js that you want to start the project with (Use arrow keys)
❯ 3.x 
  2.x 
```
- Select NO for the next two questions
```
? Use class-style component syntax? No
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)? (y/N) N
```
- Select "In package.json" in the config placement question
```
? Where do you prefer placing config for Babel, ESLint, etc.? 
  In dedicated config files 
❯ In package.json 
```
- Select NO for saving this as a preset for future projects.
```
? Save this as a preset for future projects? (y/N) N
```


## Parts of a project
- `package.json` 
  - A file that contains a list of the project's dependencies
  - It also contains script options such as `serve` or `build` (to be used in scripts such as `npm run serve`)
    - `npm install`: Project setup -- looks at the list of dependencies and installs them into `node_modules`
    - `npm run serve`: Compiles and hot-reloads for development
    - `npm run build`: Compiles and minifies for production
    - See [Configuration Reference](https://cli.vuejs.org/config/) for more information.
- `node_modules/`
  - A folder that contains the project's installed dependencies
  - This is almost always not included in the repository, and is generated with `npm install`
- `public/`
  - A folder that houses a *single*, static HTML page, and a favicon.
  - Open this HTML page and you'll notice `<div id="app"></div>` at line 14.
  - It is empty because that's where Vue will fill it with information
- `src/`: The place where all the Vue-related files are kept, so let's dive a bit deeper
  - `assets/`: A project's static files (images, videos, etc.) are kept here
  - `components/`: A project's components are kept here (Components will be tackled in [08-components-props/](./../08-components-props/))
  - `main.ts`:
    - Line 1: import the `createApp()` function from `vue` (As a replacement for `Vue.createApp({})`)
    - Line 2: import the app's configuration from `App.vue` (As a replacement for the object we've been passing into `createApp()`)
    - Line 4: creates the app and mounts it in the CSS selector, `#app` (As a replacement for `app.mount('#app')`) 
    - From here on, we'll be dealing with TypeScript instead of JavaScript.
  - `App.vue`: contains the app's configuration (`export default {}` exports the configuration information)

## Other information:
- If you are using Visual Studio Code, the extension called **Vetur** helps the IDE understand Vue files. It has autocompletion and a load of other features, so it is a must-have for Vue Developers
- **Build Workflow**: a term that means that the code we write is not the exact code that is shown in the browser, because the browser does not know what to do with Vue-specific files
  - Step 1: Code -- we code what needs to be done
  - Step 2: Build -- our raw Vue code is converted into something the browser understands
  - Step 3: Serve -- our converted code is hosted and served as a JavaScript-based web application
- Importing files
  - Package: `import { package } from 'package-name'` 
  - Custom file: `import App from './App.vue'`
    - Within `App.vue`, having `export default` tells us that that is the file's default export
    - You can actually do something like `import RandomNameHere from './App.vue'` (change the name of the default import), but the convention is to stick to the filename
