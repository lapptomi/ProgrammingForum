import * as bcrypt from 'bcrypt';
import { NewUser, Table, User } from '../../types';
import database from '../database/knex';

const getAll = async (): Promise<Array<User>> => {
  const users = await database
    .select('*')
    .from<User>(Table.User)
    .timeout(5000);

  return users as Array<User>;
};

const create = async (user: NewUser): Promise<void> => {
  const passwordHash = await bcrypt.hash(user.password, 10);

  await database<User>(Table.User)
    .insert({
      email: user.email,
      username: user.username,
      password: passwordHash,
    });
};

const findByUsername = async (username: string): Promise<User> => {
  const user = await database
    .select()
    .first()
    .from<User>(Table.User)
    .where('username', username);

  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export default {
  getAll,
  create,
  findByUsername,
};
