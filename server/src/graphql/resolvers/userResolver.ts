import { UserInputError } from 'apollo-server-express';
import { NewUser, User } from '../../../types';
import userRepository from '../../repository/userRepository';
import { toNewUser } from '../../utils';

interface AddUserArgs {
  email: string;
  username: string;
  password: string;
}

export const userQueries = {

  allUsers: (): Promise<Array<User>> => userRepository.getAll(),

};

export const userMutations = {

  addUser: async (_root: undefined, args: AddUserArgs): Promise<NewUser> => {
    try {
      const newUser = toNewUser(args);
      const addedUser = await userRepository.create(newUser);
      return addedUser;
    } catch (e) {
      throw new UserInputError((e as Error).message, {
        invalidArgs: args,
      });
    }
  },

};
