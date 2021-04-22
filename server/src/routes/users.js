const express = require('express');
const userRepository = require('../repository/userRepository');
const { parseNewUser } = require('../utils');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await userRepository.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send({ error: `Could not get users: ${error.message}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = parseNewUser(req.body);
    const addedUser = await userRepository.create(newUser);
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(400).send({ error: `Could not add user: ${error.message}` });
  }
});

module.exports = router;
