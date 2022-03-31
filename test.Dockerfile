FROM node:16

WORKDIR /usr/src/app

COPY ./client ./client

COPY ./server ./server

WORKDIR /usr/src/app/server

RUN npm ci && npm run eslint && npm run build:full

CMD ["npm", "run", "start:test"]
