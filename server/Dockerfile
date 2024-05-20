FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
EXPOSE 8999
CMD [ "npm", "start" ]