/* eslint-disable @typescript-eslint/naming-convention */
import express, { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import postRepository from '../repository/postRepository';
import commentRepository from '../repository/commentRepository';
import { toNewPost, toNewComment } from '../utils';
import { NewPost, Token } from '../../types';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const posts = await postRepository.getAll();
    res.status(200).json(posts);
  } catch (e) {
    res.status(404).send({ error: `Could not get posts: ${(e as Error).message}` });
  }
});

router.post('/', async (req: Request, res) => {
  try {
    const token = req.token as string;
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as Token;

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

router.post('/:id/comments', async (req: Request, res) => {
  try {
    const token = req.token as string;
    const decodedToken = jwt.verify(token, process.env.SECRET as string) as Token;

    if (!token || !decodedToken.username) {
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

export default router;
