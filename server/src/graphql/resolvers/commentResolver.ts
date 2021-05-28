/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ApolloContext } from '../../../types';
import commentRepository from '../../repository/commentRepository';
import { parseId } from '../../utils';

interface AddCommentArgs {
  postId: number;
  comment: string;
}
interface LikeCommentArgs {
  commentId: number;
}

export const commentMutations = {

  addComment: async (
    _root: undefined,
    args: AddCommentArgs,
    context: ApolloContext,
  ): Promise<any> => {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error('not authenticated');
    }

    console.log('POST ID = ', args);
    /*
    const newComment = new Comment(toNewComment({
      post_id: Number(args.postId),
      writer_id: 123,
      comment: args.comment,
    }));

    const addedComment = await commentRepository.create(newComment);
    */
    return null;
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
      const updatedLikes = await commentRepository.addLike(commentId, 123);

      return {
        likes: updatedLikes,
      };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  },

};
