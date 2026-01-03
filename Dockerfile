FROM node:22-slim AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host
RUN corepack enable && npm install -g corepack@latest
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM node:22-slim

ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/build .
COPY --from=builder /app/package.json .
CMD [ "node", "index.js" ]