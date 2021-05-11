import { NewPost, Post } from '../../types';
import { pool } from '../config/dbconfig';

const getAll = async (): Promise<Array<Post>> => {
  const result = await pool.query(`
    SELECT P.*, U.username, COUNT(L.liker_id) AS likes
    FROM Posts P LEFT JOIN Users U ON P.original_poster_id = U.id
                 LEFT JOIN Post_Likes L ON P.id = L.post_id
    GROUP BY P.id, U.username;
  `);

  return result.rows as Array<Post>;
};

const create = async (newPost: NewPost): Promise<NewPost> => {
  const query = (`
    INSERT INTO Posts (original_poster_id, title, description) 
    VALUES ($1, $2, $3) 
  `);
  const params = [newPost.original_poster_id, newPost.title, newPost.description];
  await pool.query(query, params);

  return newPost;
};

const addLike = async (postId: number, likerId: number): Promise<void> => {
  const postLikes = await pool.query(`
    SELECT * FROM Post_Likes  
    WHERE (liker_id = ${likerId}) AND (post_id = ${postId})
  `);

  // Check that the post is not already liked by the user
  if (postLikes.rowCount !== 0) {
    throw new Error('Could not add like, you can only like post once');
  }

  const query = (`
    INSERT INTO Post_Likes (post_id, liker_id)
    VALUES ($1, $2)
  `);
  const params = [postId, likerId];
  await pool.query(query, params);
};

export default {
  getAll,
  create,
  addLike,
};
