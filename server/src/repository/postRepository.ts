import {
  NewPost, Post, Table, User,
} from '../../types';
import database from '../database/knex';

interface PostReturnType extends Post {
  likes: number; // post likes
  username: string; // original poster username
}

interface PostLikes {
  id: number;
  post_id: number;
  liker_id: number;
}

const getAll = async (): Promise<Array<PostReturnType>> => {
  // Join poster username and post likes to the post
  const posts = await database
    .from<Post>(Table.Post)
    .join<User>(Table.User, 'user.id', '=', 'original_poster_id')
    .leftJoin<PostLikes>(Table.PostLikes, 'post_id', '=', 'post.id')
    .select('post.*', 'user.username')
    .count('post_like.* AS likes')
    .groupBy('post.id', 'user.username')
    .timeout(5000);

  return posts as Array<PostReturnType>;
};

const create = async (post: NewPost): Promise<NewPost> => {
  await database<Post>(Table.Post)
    .insert({
      original_poster_id: post.original_poster_id,
      title: post.title,
      description: post.description,
    })
    .timeout(5000);

  return post;
};

const addLike = async (postId: number, likerId: number): Promise<void> => {
  const postLikes = await database
    .select('*')
    .from(Table.PostLikes)
    .where('post_id', '=', postId)
    .andWhere('liker_id', '=', likerId)
    .timeout(5000);

  const hasLikedAlready = postLikes.length !== 0;
  // Check that the post is not already liked by the user
  if (hasLikedAlready) {
    throw new Error('Could not add like, you can like post only once');
  }

  // Else add new like
  await database(Table.PostLikes)
    .insert({
      post_id: postId,
      liker_id: likerId,
    })
    .timeout(5000);
};

export default {
  getAll,
  create,
  addLike,
};
