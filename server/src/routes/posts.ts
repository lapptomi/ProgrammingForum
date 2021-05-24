/* eslint-disable @typescript-eslint/naming-convention */
import express, { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import postRepository from '../repository/postRepository';
import commentRepository from '../repository/commentRepository';
import { toNewPost, toNewComment, parseId } from '../utils';
import { NewPost, User } from '../../types';

const router = express.Router();

// Get all posts
router.get('/', async (_req, res) => {
  try {
    const posts = await postRepository.getAll();
    res.status(200).json(posts);
  } catch (e) {
    res.status(404).send({ error: `Could not get posts: ${(e as Error).message}` });
  }
});

// Create new post
router.post('/', async (req: Request, res) => {
  try {
    const token = req.token as string;
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as User;

    if (!token || !decodedToken.id) {
      throw new Error('Token missing or invalid');
    }

    const newPost = toNewPost(decodedToken.id, req.body as NewPost);
    const addedPost = await postRepository.create(newPost);

    res.status(201).json(addedPost);
  } catch (e) {
    res.status(401).send((e as Error).message);
  }
});

// Add like to post
router.post('/:id/likes', async (req: Request, res) => {
  try {
    const postId = parseId(Number(req.params.id));

    const token = req.token as string;
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as User;

    if (!token || !decodedToken.id) {
      throw new Error('Token missing or invalid');
    }

    const addedLike = await postRepository.addLike(postId, decodedToken.id);
    res.status(201).json(addedLike);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

// Get all comments of a post
router.get('/:id/comments', async (req: Request, res) => {
  try {
    const postId = Number(req.params.id);
    const comments = await commentRepository.findByPostId(postId);
    if (_.isEmpty(comments)) {
      res.status(404).json(`Could not find comments with post id: ${postId}`);
    } else {
      res.status(200).json(comments);
    }
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

// Add new comment to post
router.post('/:id/comments', async (req: Request, res) => {
  try {
    const token = req.token as string;
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as User;

    if (!token || !decodedToken.id) {
      throw new Error('Token missing or invalid');
    }

    const newComment = toNewComment({
      post_id: Number(req.params.id),
      writer_id: decodedToken.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      comment: req.body.comment as string,
    });

    const addedComment = await commentRepository.create(newComment);
    res.status(201).json(addedComment);
  } catch (e) {
    res.status(401).send((e as Error).message);
  }
});

// Add like to post comment
router.post('/comments/:id/likes', async (req: Request, res) => {
  try {
    const commentId = parseId(Number(req.params.id));

    const token = req.token as string;
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as User;

    if (!token || !decodedToken.id) {
      throw new Error('Token missing or invalid');
    }

    const addedLike = await commentRepository.addLike(commentId, decodedToken.id);
    res.status(201).json(addedLike);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;
