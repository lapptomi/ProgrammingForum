FROM node:16

WORKDIR /usr/src/app

COPY ./client ./client

RUN cd client && npm ci && npm run lint

COPY ./server ./server

RUN cd server && npm ci && npm run eslint && npm run build:full

WORKDIR /usr/src/app/server

CMD ["npm", "run", "start:prod"]
