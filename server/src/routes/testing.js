const express = require('express');
const { initializeDB } = require('../config/dbconfig');

const router = express.Router();

router.post('/resetdb', async (_req, res) => {
  try {
    await initializeDB();
    res.status(200).end();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.get('/health', async (_req, res) => {
  res.status(200).send('ok');
});

module.exports = router;
