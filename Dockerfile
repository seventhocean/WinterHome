FROM node:20-alpine AS builder

WORKDIR /app

# 1. 单独缓存依赖层（package*.json 不变时直接使用缓存，无需重新安装）
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# 2. 仅复制源代码
COPY . .

# 3. 构建
RUN --mount=type=cache,target=/root/.npm \
    npm run generate

FROM nginx:alpine

COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
