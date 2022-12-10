### Build Step
# pull the Node.js Docker image
FROM node:16 as build

# change working directory
WORKDIR /app

# copy the package.json files from local machine to the workdir in container
COPY svelte.config.js package*.json /app/
RUN mkdir -p /app/build/static
COPY static /app/build/static

# run npm install in our local machine
RUN npm ci

# copy the generated modules and all other files to the container
COPY . .
RUN ls -alh

# build the application
RUN npm run build

### Serve Step
# pull the Node.js Docker image
FROM node:16

# change working directory
WORKDIR /app

# copy files from previous step

COPY --from=build /app/package.json .
COPY --from=build /app/build .
COPY --from=build /app/node_modules ./node_modules


# our app is running on port 3000 within the container, so need to expose it
EXPOSE 3000
# the command that starts our app
CMD ["node", "index.js"]
