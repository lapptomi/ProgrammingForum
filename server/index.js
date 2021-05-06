/* eslint-disable no-console */
const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
