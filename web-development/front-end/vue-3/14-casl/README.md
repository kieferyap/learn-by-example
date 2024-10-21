# About
## Objective
To learn about routing with Unpluggin Vue Router

## Running the Demo
- Navigate to the `13-casl` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server

# Setup
## Project
These were the commands I ran to start `13-casl`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has `casl/ability`:

```bash
npm install @casl/ability
```

This project also makes use of the routing packages, so if you'd like to install them, feel free to have a look at [../12-routing/README.md](./../12-routing/README.md).

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
