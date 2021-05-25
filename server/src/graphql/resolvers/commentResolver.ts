import { ApolloContext, Comment } from '../../../types';
import commentRepository from '../../repository/commentRepository';
import { parseId, toNewComment } from '../../utils';

interface AddCommentArgs {
  postId: number;
  comment: string;
}
interface FindCommentsArgs {
  postId: number;
}
interface LikeCommentArgs {
  commentId: number;
}

export const commentQueries = {

  allComments: (): Promise<Array<Comment>> => commentRepository.getAll(),

  findComments: async (
    _root: undefined,
    args: FindCommentsArgs,
  ): Promise<Array<Comment>> => {
    const postId = parseId(Number(args.postId));
    const postComments = await commentRepository.findByPostId(postId);
    return postComments;
  },

};

export const commentMutations = {

  addComment: async (
    _root: undefined,
    args: AddCommentArgs,
    context: ApolloContext,
  ): Promise<Comment> => {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error('not authenticated');
    }

    const newComment = toNewComment({
      post_id: Number(args.postId),
      writer_id: currentUser.id,
      comment: args.comment,
    });

    const addedComment = await commentRepository.create(newComment);

    return {
      id: addedComment.id,
      post_id: addedComment.post_id,
      writer_id: addedComment.writer_id,
      comment: addedComment.comment,
      created_at: addedComment.created_at,
      updated_at: addedComment.updated_at,
    };
  },

  likeComment: async (
    _root: undefined,
    args: LikeCommentArgs,
    context: ApolloContext,
  ): Promise<any> => {
    try {
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('not authenticated');
      }

      const commentId = parseId(Number(args.commentId));
      const updatedLikes = await commentRepository.addLike(commentId, currentUser.id);

      return {
        likes: updatedLikes,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  },

};
