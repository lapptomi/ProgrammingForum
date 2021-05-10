import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import express from 'express';
import userRepository from '../repository/userRepository';
import { Token, User } from '../../types';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body as User;
    const user = await userRepository.findByUsername(username);
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!(user && passwordsMatch)) {
      throw new Error('Invalid username or password');
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    } as Token;

    const token = jwt.sign(
      userForToken,
      process.env.SECRET as string,
      { expiresIn: 60 * 60 }, // expires in 1h
    );

    res.status(200).send({ token, username: userForToken.username });
  } catch (e) {
    res.status(401).send({ error: (e as Error).message });
  }
});

export default router;
