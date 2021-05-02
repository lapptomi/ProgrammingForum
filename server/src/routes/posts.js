const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const postRepository = require('../repository/postRepository');
const commentRepository = require('../repository/commentRepository');

const { parseNewPost, parseComment } = require('../utils');

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

    const newPost = parseNewPost(req.body);
    const addedPost = await postRepository.create(decodedToken.id, newPost);
    res.status(201).json(addedPost);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get('/:id/comments', async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await commentRepository.findByPostId(postId);
    if (_.isEmpty(comments)) {
      res.status(404).json(`Could not find comments with post id: ${postId}`);
    } else {
      res.status(200).json(comments);
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post('/:id/comments', async (req, res) => {
  const postId = req.params.id;

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!req.token || !decodedToken.username) {
      throw new Error('Token missing or invalid');
    }

    const addedComment = await commentRepository.create(
      postId,
      decodedToken.id,
      decodedToken.username,
      parseComment(req.body.comment),
    );

    res.status(201).json(addedComment);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

module.exports = router;
