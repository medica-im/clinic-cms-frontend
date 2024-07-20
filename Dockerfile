FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build --verbose

FROM node:18-alpine AS deploy-node

WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package*.json ./
COPY --from=build /app/build .
RUN npm ci
CMD ["node", "index.js"]