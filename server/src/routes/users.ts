import express from 'express';
import { NewUser } from '../../types';
import userRepository from '../repository/userRepository';
import { toNewUser } from '../utils';

const router = express.Router();

// Get all users
router.get('/', async (_req, res) => {
  try {
    const users = await userRepository.getAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).send({ error: `Could not get users: ${(e as Error).message}` });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const newUser = toNewUser(req.body as NewUser);
    const addedUser = await userRepository.create(newUser);
    res.status(201).json(addedUser);
  } catch (e) {
    res.status(400).send({ error: `Could not add user: ${(e as Error).message}` });
  }
});

export default router;
