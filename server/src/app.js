const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const postRouter = require('./routes/posts');
const testingRouter = require('./routes/testing');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

app.use(tokenExtractor);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/posts', postRouter);
app.use('/api/testing', testingRouter);

/*
  React-router-dom didn't work with express.static
  without sending index.html from the build folder
*/
app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: 'build/' });
});

module.exports = app;
