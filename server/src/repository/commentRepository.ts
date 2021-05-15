import { Comment, NewComment, Table } from '../../types';
import database from '../database/knex';

const findByPostId = async (postId: number): Promise<Array<Comment>> => {
  const comments = await database
    .from(Table.PostComments)
    .join(Table.User, 'user.id', '=', 'post_comment.writer_id')
    .select('post_comment.*', 'user.username')
    .where('post_comment.post_id', '=', postId)
    .timeout(5000);

  return comments as Array<Comment>;
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

  await database(Table.PostComments)
    .increment('likes', 1)
    .where('post_comment.id', '=', commentId)
    .timeout(5000);

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
