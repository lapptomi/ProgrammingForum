import { gql, UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { IUser, NewUser } from '../../types';
import User from '../models/User';
import { toNewUser } from '../utils';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
  }

  extend type Query {
    allUsers: [User!]!
  }

  extend type Mutation {
    addUser(
      email: String!
      username: String!
      password: String!
    ): User
  }
`;

export const resolvers = {
  Query: {
    allUsers: async (): Promise<Array<IUser>> => {
      return User.find({});
    },
  },
  Mutation: {
    addUser: async (_root: unknown, args: NewUser): Promise<NewUser> => {
      try {
        const newUser = new User(toNewUser(args));
        newUser.password = await bcrypt.hash(newUser.password, 10);
        const addedUser = await newUser.save();
        return addedUser;
      } catch (e) {
        throw new UserInputError((e as Error).message, {
          invalidArgs: args,
        });
      }
    },
  },
};
