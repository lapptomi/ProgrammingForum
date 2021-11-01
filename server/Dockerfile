
FROM pf-client-prod AS react-client

FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only-production && npm run build

COPY --from=react-client /usr/src/app/build ./dist/

CMD ["npm", "run", "start:prod"]
