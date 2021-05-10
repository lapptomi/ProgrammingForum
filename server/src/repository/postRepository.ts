import { Post } from '../../types';
import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<Post>> => {
  const result = await pool.query('SELECT * FROM Posts');
  return result.rows as Array<Post>;
};

const create = async (userId: number, newPost: Post): Promise<Post> => {
  const query = ('INSERT INTO Posts (original_poster_id, title, description) VALUES ($1, $2, $3)');
  const values = [userId, newPost.title, newPost.description];
  await pool.query(query, values);

  return {
    title: newPost.title,
    description: newPost.description,
  } as Post;
};

export default {
  getAll,
  create,
};
