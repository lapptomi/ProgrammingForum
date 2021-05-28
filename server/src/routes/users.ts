import express from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/User';
import { toNewUser } from '../utils';

const router = express.Router();

// Create new user
router.post('/', async (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const newUser = new User(toNewUser(req.body));
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const addedUser = await newUser.save();
    res.status(201).json(addedUser);
  } catch (e) {
    res.status(400).send({ error: `Could not add user: ${(e as Error).message}` });
  }
});

export default router;
