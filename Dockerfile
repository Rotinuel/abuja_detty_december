# syntax=docker.io/docker/dockerfile:1

FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN bun install --frozen-lockfile

# Build
COPY . .
RUN bun run build

# Run production
EXPOSE 3000
CMD ["bun", "run", "start"]
