FROM node:16

WORKDIR /usr/src/app

COPY ./client ./client

COPY ./server ./server

RUN cd server && npm ci && npm run build:full

WORKDIR /usr/src/app/server

CMD ["npm", "run", "start:test"]
