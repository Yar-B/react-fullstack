FROM node:latest AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]