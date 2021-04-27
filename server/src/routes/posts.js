const express = require('express');
const jwt = require('jsonwebtoken');
const postRepository = require('../repository/postRepository');
const userRepository = require('../repository/userRepository');
const { parseNewPost } = require('../utils');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const posts = await postRepository.getAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).send({ error: `Could not get posts: ${error.message}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.username) {
      throw new Error('Token missing or invalid');
    }

    const originalPoster = await userRepository.findByUsername(decodedToken.username);

    const newPost = parseNewPost(req.body);
    const addedPost = await postRepository.create(originalPoster.id, newPost);
    res.status(201).json(addedPost);
  } catch (error) {
    res.status(400).send({ error: `Could not add new post: ${error.message}` });
  }
});

module.exports = router;
