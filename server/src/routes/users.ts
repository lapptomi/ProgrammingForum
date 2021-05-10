import express from 'express';
import userRepository from '../repository/userRepository';
import { parseNewUser } from '../utils';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const users = await userRepository.getAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(404).send({ error: `Could not get users: ${(e as Error).message}` });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = parseNewUser(req.body);
    const addedUser = await userRepository.create(newUser);
    res.status(201).json(addedUser);
  } catch (e) {
    res.status(400).send({ error: `Could not add user: ${(e as Error).message}` });
  }
});

export default router;
