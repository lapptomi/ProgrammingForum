const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const userRepository = require('../repository/userRepository');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userRepository.findByUsername(username);
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!(user && passwordsMatch)) {
      throw new Error('Invalid username or password');
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60 * 60 }, // expires in 1h
    );

    res.status(200).send({ token, username: userForToken.username });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
});

module.exports = router;
