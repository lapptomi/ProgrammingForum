const express = require('express');
const postRepository = require('../repository/postRepository');
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
    const newPost = parseNewPost(req.body);
    const addedPost = await postRepository.create(newPost);
    res.status(201).json(addedPost);
  } catch (error) {
    res.status(400).send({ error: `Could not add new post: ${error.message}` });
  }
});

module.exports = router;
