import { NewPost, Post } from '../../types';
import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<Post>> => {
  const result = await pool.query(`
    SELECT P.*, U.username as writer_username
    FROM Posts P, Users U 
    WHERE P.original_poster_id = U.id
  `);

  return result.rows as Array<Post>;
};

const create = async (newPost: NewPost): Promise<NewPost> => {
  const query = (`
    INSERT INTO Posts (original_poster_id, title, description) 
    VALUES ($1, $2, $3) 
  `);
  const values = [newPost.original_poster_id, newPost.title, newPost.description];
  await pool.query(query, values);

  return newPost;
};

export default {
  getAll,
  create,
};
