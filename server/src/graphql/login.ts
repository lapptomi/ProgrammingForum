import { gql } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Token } from '../../types';
import User from '../models/User';

interface LoginArgs {
  username: string;
  password: string;
}

export const typeDefs = gql`
  type Token {
    id: ID!
    username: String!
    token: String!
  }

  extend type Mutation {
    login(
      username: String!
      password: String!
    ): Token
  }
`;

export const resolvers = {
  Mutation: {
    login: async (_root: any, args: LoginArgs): Promise<Token> => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new Error('User not found');
      }

      const passwordsMatch = await bcrypt.compare(args.password, user.password);
      if (!passwordsMatch) {
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
  },
};
