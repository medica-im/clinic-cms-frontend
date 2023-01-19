FROM node:16-alpine AS build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build --verbose

FROM node:16-alpine AS deploy-node

WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm ci
COPY --from=build /app/build .
CMD ["node", "index.js"]