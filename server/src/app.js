const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

module.exports = app;
