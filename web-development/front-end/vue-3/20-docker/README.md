# About
## Objective
To learn how to use Docker with Vue/Vite

## Running the Demo
- Navigate to the `20-docker` directory in your command line
- Run `docker run -p 5173:5173 -p 3001:3001 --name learn-by-example-container learn-by-example` after setting up docker on your computer.

# About Docker
- **What is it?**: It's kind of like a virtual machine specifically for your project, but lighter
- **Purpose**: It aims to standardize the development environment (called a "container") for the team, eliminating the "b-but it works in my machine!!" problem
- **Installation**: As installation procedures differ per OS, it might be better to check https://www.docker.com for the installation procedure

# Setting up
- Create a [dockerfile](./dockerfile), which contains information on:
  - Which Node version to use
  - Which dependencies to install
  - Commands to start the development server
  ```dockerfile
  # Use the official Node.js image as the base image
  FROM node:20.18-alpine

  # Set the working directory in the container
  WORKDIR /app

  # Copy package.json and package-lock.json to the working directory
  COPY package*.json ./

  # Install dependencies
  RUN npm install

  # Install tsx globally for running TypeScript scripts
  RUN npm install -g tsx

  # Copy the rest of the application code
  COPY . .

  # Expose the port Vite runs on
  EXPOSE 5173 4000

  # Install concurrently to run multiple scripts
  RUN npm install -g concurrently

  # Command to run both the front-end and back-end servers
  CMD ["concurrently", "npm run dev -- --host", "npx tsx fake-api-server.ts"]
  ```
- Create a [.dockerignore](./.dockerignore) file, which contains information on which files to ignore.
  ```dockerignore
  node_modules
  dist
  npm-debug.log
  ```
- Build the Docker image
  ```bash
  docker build -t my-vue-app .
  ```
- Run the container (note how the ports are exposed)
  ```bash
  docker run -p 5173:5173 -p 3001:3001 --name learn-by-example-container learn-by-example
  ```
- The project should now be accessible in https://localhost:5173
- Stop the container
  ```bash
  docker stop learn-by-example-container
  ```
- If you want to delete the container, you can do so by running:
  ```bash
  docker rm learn-by-example-container
  ```

# Running commands concurrently
- To get this project up and running, we needed to run two commands at the same time:
  - `npm run dev` to start the front-end server
  - `npx tsx fake-api-server.ts` to start the back-end server
- There are actually two ways to do this:
  - The first one is to use `"concurrently"`, which is what is being done in this project, as seen in the last command within the [dockerfile](./dockerfile)
  - Another approach is to have two dockerfiles (say `frontend.dockerfile` and `backend.dockerfile`), and have a `docker-compose.yml` containing the front and back-end container information

# Further reading
- Docker documentation: https://docs.docker.com
