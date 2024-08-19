FROM node:22

WORKDIR /usr/src/twitter-api

COPY . .

RUN npm install

CMD ["node", "server.js"]