import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { NewUser } from '../../../types';
import User from '../../models/User';
import { toNewUser } from '../../utils';

interface AddUserArgs {
  email: string;
  username: string;
  password: string;
}

export const userQueries = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  allUsers: () => User.find({}),
};

export const userMutations = {
  addUser: async (_root: undefined, args: AddUserArgs): Promise<NewUser> => {
    try {
      const newUser = new User(toNewUser(args));
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const addedUser = await newUser.save();

      console.log('added = ', addedUser);
      return addedUser;
    } catch (e) {
      throw new UserInputError((e as Error).message, {
        invalidArgs: args,
      });
    }
  },
};
