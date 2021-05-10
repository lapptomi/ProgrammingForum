import { Comment } from '../../types';
import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<Comment>> => {
  const result = await pool.query('SELECT * FROM Comments');
  return result.rows as Array<Comment>;
};

const findByPostId = async (postId: number): Promise<Array<Comment>> => {
  const query = ('SELECT * FROM Comments WHERE (post_id = $1)');
  const result = await pool.query(query, [postId]);
  return result.rows as Array<Comment>; // result.rows are the comments found from the db
};

const create = async (
  postId: number, writerId: number, writerName: string, newComment: string,
): Promise<Comment> => {
  const query = ('INSERT INTO Comments (post_id, writer_id, writer_username, comment) VALUES ($1, $2, $3, $4)');
  const values = [postId, writerId, writerName, newComment];
  await pool.query(query, values);

  return {
    post_id: postId,
    writer_id: writerId,
    writer_username: writerName,
    comment: newComment,
  } as Comment;
};

export default {
  getAll,
  findByPostId,
  create,
};
