import {
  Comment, NewComment, Table, User,
} from '../../types';
import database from '../database/knex';

interface CommentLikes {
  post_comment_id: number;
  liker_id: number;
}

interface CommentReturnType extends Comment {
  likes: number; // post likes
  username: string; // original poster username
}

const findByPostId = async (postId: number): Promise<Array<CommentReturnType>> => {
  // Join comment writer username and comment likes to the comment
  const comments = await database
    .from<Comment>(Table.PostComments)
    .join<User>(Table.User, 'user.id', '=', 'post_comment.writer_id')
    .leftJoin<CommentLikes>(Table.PostCommentLikes, 'post_comment_id', '=', 'post_comment.id')
    .select('post_comment.*', 'user.username')
    .count('post_comment_like.* AS likes')
    .where('post_comment.post_id', '=', postId)
    .groupBy('post_comment.id', 'user.username')
    .timeout(5000);

  return comments as Array<CommentReturnType>;
};

const create = async (comment: NewComment): Promise<void> => {
  await database(Table.PostComments)
    .insert({
      post_id: comment.post_id,
      writer_id: comment.writer_id,
      comment: comment.comment,
    })
    .timeout(5000);
};

const addLike = async (commentId: number, likerId: number): Promise<void> => {
  const commentLikes = await database
    .select('*')
    .from(Table.PostCommentLikes)
    .where('post_comment_id', '=', commentId)
    .andWhere('liker_id', '=', likerId)
    .timeout(5000);

  const hasLikedAlready = commentLikes.length !== 0;
  // Check that the comment is not already liked by the user
  if (hasLikedAlready) {
    throw new Error('Could not add like, you can like comment only once');
  }

  // Else add new like
  await database(Table.PostCommentLikes)
    .insert({
      post_comment_id: commentId,
      liker_id: likerId,
    })
    .timeout(5000);
};

export default {
  findByPostId,
  create,
  addLike,
};
