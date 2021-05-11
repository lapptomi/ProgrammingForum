import * as bcrypt from 'bcrypt';
import { NewUser, User } from '../../types';
import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<User>> => {
  const result = await pool.query('SELECT * FROM Users');
  return result.rows as Array<User>;
};

const create = async (user: NewUser): Promise<NewUser> => {
  const query = ('INSERT INTO Users (email, username, password) VALUES ($1, $2, $3)');
  const passwordHash = await bcrypt.hash(user.password, 10);
  const params = [user.email, user.username, passwordHash];
  await pool.query(query, params);

  return {
    email: user.email,
    username: user.username,
    password: passwordHash,
  } as NewUser;
};

const findByUsername = async (username: string): Promise<User> => {
  const query = ('SELECT * FROM Users WHERE (username = $1)');
  const result = await pool.query(query, [username]);
  if (result.rowCount === 0) {
    throw new Error(`No user found with username: ${username}`);
  }
  return result.rows[0] as User;
};

export default {
  getAll,
  create,
  findByUsername,
};
