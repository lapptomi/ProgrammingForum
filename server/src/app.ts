import express from 'express';
import cors from 'cors';
import userRouter from './routes/users';
import postRouter from './routes/posts';
import testingRouter from './routes/testing';
import { errorHandler, tokenExtractor } from './middleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('./dist/build'));

app.use(tokenExtractor);

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/testing', testingRouter);

/*
  React-router-dom didn't work with express.static
  without sending index.html from the build folder
*/
app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: './dist/build/' });
});

app.use(errorHandler);

export default app;
