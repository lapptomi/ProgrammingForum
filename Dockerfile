FROM node:16

WORKDIR /usr/src/app

COPY ./server ./

RUN npm ci --only-production && npm run build

COPY ./client ./client

RUN cd client && npm ci --only-production && npm run build

RUN cp -R ./client/build ./dist/

CMD ["npm", "run", "start:prod"]
