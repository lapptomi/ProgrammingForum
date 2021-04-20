const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.use('/api/users', userRouter);

/*
  React-router-dom didn't work with express.static
  without sending index.html from the build folder
*/
app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: 'build/' });
});

module.exports = app;
