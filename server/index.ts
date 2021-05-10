/* eslint-disable no-console */
import http from 'http';
import app from './src/app';

const server = http.createServer(app);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
