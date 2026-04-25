FROM node:alpine3.20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build


FROM caddy:alpine

COPY --from=build /app/dist /usr/share/caddy

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
EXPOSE 443