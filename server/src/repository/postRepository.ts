import { NewPost, Post, Table } from '../../types';
import database from '../database/knex';

const getAll = async (): Promise<Array<Post>> => {
  const posts = await database
    .from(Table.Post)
    .join(Table.User, 'user.id', '=', 'original_poster_id')
    .select('post.*', 'user.username')
    .timeout(5000);

  return posts as Array<Post>;
};

const create = async (post: NewPost): Promise<void> => {
  await database<Post>(Table.Post)
    .insert({
      original_poster_id: post.original_poster_id,
      title: post.title,
      description: post.description,
    });
};

const addLike = async (postId: number, likerId: number): Promise<void> => {
  const postLikes = await database
    .select('*')
    .from(Table.PostLikes)
    .where('post_id', '=', postId)
    .andWhere('liker_id', '=', likerId);

  const hasLikedAlready = postLikes.length !== 0;
  // Check that the post is not already liked by the user
  if (hasLikedAlready) {
    throw new Error('Could not add like, you can only like post once');
  }

  await database(Table.Post)
    .increment('likes', 1)
    .where('post.id', '=', postId);

  await database(Table.PostLikes)
    .insert({
      post_id: postId,
      liker_id: likerId,
    });
};

export default {
  getAll,
  create,
  addLike,
};
