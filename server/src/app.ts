import express from 'express';
import cors from 'cors';
import testingRouter from './routes/testing';
import userRouter from './routes/users';

import { errorHandler } from './middleware';
import { NODE_ENV } from './config/config';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./dist/build'));

app.get('/', (_req, res) => {
  res.send('Hello world!').status(200);
});

app.use('/api/users', userRouter);
app.use('/api/testing', testingRouter);

if (NODE_ENV !== 'development') {
  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: './dist/build/' });
  });
}

app.use(errorHandler);

export default app;
