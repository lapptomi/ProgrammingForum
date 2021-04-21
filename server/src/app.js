const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

/*
  React-router-dom didn't work with express.static
  without sending index.html from the build folder
*/
app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: 'build/' });
});

module.exports = app;
