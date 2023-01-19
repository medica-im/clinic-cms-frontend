FROM node:16-alpine AS build

WORKDIR /app
COPY . .
RUN npm ci --include=dev
RUN npm run build --verbose

FROM node:18-alpine AS deploy-node

ENV NODE_ENV=production
WORKDIR /app
RUN rm -rf ./*
COPY --from=build /app/package.json .
COPY --from=build /app/build .
RUN npm ci
CMD ["node", "index.js"]