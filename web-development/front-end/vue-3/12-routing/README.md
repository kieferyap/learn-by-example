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
The following files need to be modified to look like the one in this project:
- [vite.config.ts](./vite.config.ts)
- [tsconfig.json](./tsconfig.json)
- [src/router.ts](./src/router.ts)
- [src/main.ts](./src/main.ts)

Finally, create `src/pages/posts/[id].vue` and `src/pages/posts/index.vue` and run the following:
```bash
npm run dev
```

You should see the routes file, [typed-router.d.ts](./typed-router.d.ts) auto-generated with routes representing the Vue pages that were just created.

