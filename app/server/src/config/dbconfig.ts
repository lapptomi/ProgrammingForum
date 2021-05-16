import database from '../database/knex';
import { Table } from '../../types';

export const resetDatabase = async (): Promise<void> => {
  // Delete all rows from the tables
  await database(Table.PostLikes).del();
  await database(Table.PostComments).del();
  await database(Table.Post).del();
  await database(Table.User).del();
};
