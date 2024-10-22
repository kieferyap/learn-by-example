# About
## Objective
To learn about making HTTP requests with ofetch (and fake-api)

## Running the Demo
- Navigate to the `13-backend` directory in your command line
- Run `npm install` to install dependencies
- Run `npm run dev` to run the front end server
- Run `npx tsx fake-api-server.ts` to run the back end server

# Setup
## Project
These were the commands I ran to start `13-backend`. You don't have to run them anymore, but these commands may be helpful to those who would like to setup a project that has `ofetch`:

```bash
npm install fake-api
npm install express
npm install typescript ts-node @types/node @types/express cors
```

This project also makes use of the routing packages, so if you'd like to install them, feel free to have a look at [../12-routing/README.md](./../12-routing/README.md).