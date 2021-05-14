import { Comment, NewComment, Table } from '../../types';
import database from '../database/knex';

const getAll = async (): Promise<Array<Comment>> => {
  const comments = await database
    .select('*')
    .from(Table.PostComments)
    .timeout(5000);

  return comments as Array<Comment>;
};

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
    });
};

export default {
  getAll,
  findByPostId,
  create,
};
