import { NewPost, Post, ApolloContext } from '../../../types';
import postRepository from '../../repository/postRepository';
import { parseId, toNewPost } from '../../utils';

interface Root {
  root: Post;
}
interface FindPostArgs {
  postId: number;
}
interface AddPostArgs {
  title: string;
  description: string;
}
interface LikePostArgs {
  postId: number;
}

export const postQueries = {
  allPosts: (): Promise<Array<Post>> => postRepository.getAll(),
  findPost: async (
    _root: Root,
    args: FindPostArgs,
  ): Promise<Post> => {
    const postId = parseId(Number(args.postId));
    const posts = await postRepository.getAll();
    const post = posts.find((p: Post) => p.id === postId);
    return post as Post;
  },
};

export const postMutations = {

  addPost: async (
    _root: Root,
    args: AddPostArgs,
    context: ApolloContext,
  ): Promise<NewPost | null> => {
    try {
      const { currentUser } = context;
      if (!currentUser) {
        throw new Error('not authenticated');
      }

      const newPost = toNewPost({
        original_poster_id: currentUser.id,
        title: args.title,
        description: args.description,
      });

      const addedPost = await postRepository.create(newPost);
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

      const postId = parseId(Number(args.postId));
      await postRepository.addLike(postId, currentUser.id);
      const updatedLikes = await postRepository.findLikesByPostId(postId);

      return {
        likes: updatedLikes,
      };
    } catch (error) {
      return null;
    }
  },
};
