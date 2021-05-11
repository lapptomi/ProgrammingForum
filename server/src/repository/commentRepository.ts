import { Comment, NewComment } from '../../types';
import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<Comment>> => {
  const result = await pool.query('SELECT * FROM Post_Comments');
  return result.rows as Array<Comment>;
};

const findByPostId = async (postId: number): Promise<Array<Comment>> => {
  const query = (`
    SELECT C.*, U.username AS writer_username
    FROM Post_Comments C, Users U 
    WHERE (post_id = $1) AND (U.id = C.writer_id) 
  `);
  const result = await pool.query(query, [postId]);

  return result.rows as Array<Comment>;
};

const create = async (comment: NewComment): Promise<NewComment> => {
  const query = (`
    INSERT INTO Post_Comments (post_id, writer_id, comment) 
    VALUES ($1, $2, $3)  
  `);
  const params = [comment.post_id, comment.writer_id, comment.comment];
  await pool.query(query, params);

  return comment;
};

export default {
  getAll,
  findByPostId,
  create,
};
