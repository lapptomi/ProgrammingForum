import { IPost, ApolloContext } from '../../../types';
import Comment, { ICommentSchema } from '../../models/Comment';
import Post, { IPostSchema } from '../../models/Post';
import { toNewComment, toNewPost } from '../../utils';

interface Root {
  root: IPost;
}
interface FindPostArgs {
  postId: string;
}
interface AddPostArgs {
  title: string;
  description: string;
}
interface LikePostArgs {
  postId: string;
}
interface AddCommentArgs {
  postId: string;
  comment: string;
}

export const postQueries = {
  allPosts: async () => {
    const posts = await Post.find({})
      .populate('original_poster')
      .populate('comments');
    console.log(posts);
    return posts;
  },
  findPost: async (
    _root: Root,
    args: FindPostArgs,
  ): Promise<IPostSchema | null> => {
    const post = Post.findById(args.postId).populate('original_poster');
    return post;
  },
};

export const postMutations = {

  addPost: async (
    _root: Root,
    args: AddPostArgs,
    context: ApolloContext,
  ): Promise<IPostSchema | null> => {
    try {
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('not authenticated');
      }

      const newPost = new Post(toNewPost({
        original_poster: currentUser.id,
        title: args.title,
        description: args.description,
      }));

      const addedPost = await newPost.save();
      return addedPost;
    } catch (error) {
      console.log((error as Error).message);
      return null;
    }
  },

  likePost: async (
    _root: Root,
    args: LikePostArgs,
    context: ApolloContext,
  ): Promise<any> => {
    try {
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('not authenticated');
      }

      const post = await Post.findById(args.postId);
      if (!post) {
        throw new Error('Error liking post: Post not found');
      }

      post.likes += 1;
      await post.save();

      return {
        likes: post.likes + 1,
      };
    } catch (error) {
      return null;
    }
  },

  addComment: async (
    _root: undefined,
    args: AddCommentArgs,
    context: ApolloContext,
  ): Promise<ICommentSchema> => {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error('not authenticated');
    }
    const post = await Post.findById(args.postId);
    if (!post) {
      throw new Error('Could not add comment');
    }

    const newComment = new Comment(toNewComment({
      comment_writer: args.postId,
      comment: args.comment,
    }));

    const addedComment = await newComment.save();
    post.comments = post.comments.concat(addedComment.id);
    await post.save();

    return addedComment;
  },
};
