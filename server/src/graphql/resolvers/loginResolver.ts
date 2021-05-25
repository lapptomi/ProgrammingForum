import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Token } from '../../../types';
import userRepository from '../../repository/userRepository';

interface LoginArgs {
  username: string;
  password: string;
}

export const loginMutations = {

  login: async (_root: unknown, args: LoginArgs): Promise<Token> => {
    const user = await userRepository.findByUsername(args.username);
    const passwordsMatch = await bcrypt.compare(args.password, user.password);

    if (!(user && passwordsMatch)) {
      throw new Error('Invalid username or password');
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const newToken = jwt.sign(
      userForToken,
      process.env.SECRET as string,
      { expiresIn: 60 * 60 }, // expires in 1h
    );

    return {
      token: newToken,
      username: user.username,
      id: user.id,
    };
  },

};
