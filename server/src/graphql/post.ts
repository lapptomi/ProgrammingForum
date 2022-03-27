import { gql } from 'apollo-server-express';
import { ApolloContext, IComment, IPost } from '../../types';
import Comment from '../models/Comment';
import Post from '../models/Post';
import { toNewComment, toNewPost } from '../utils';

interface Args {
  postId?: string;
  title?: string;
  description?: string;
  comment?: string;
  commentId?: string;
}

export const typeDefs = gql`
  type Post {
    id: ID!
    original_poster: User!
    created_at: String!
    title: String!
    description: String!
    likers: [User!]
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    created_at: String!
    comment_writer: User!
    comment: String!
    likers: [User!]
  }

  extend type Query {
    allPosts: [Post!]!
    findPost(postId: ID!): Post!
    allComments: [Comment!]!
    findComments(postId: ID!): [Comment!]!
  }

  extend type Mutation {
    addPost(
      title: String!
      description: String!
    ): Post

    likePost(
      postId: ID!
    ): Post

    addComment(
      postId: ID!
      comment: String!
    ): Comment

    likeComment(
      commentId: ID!
    ): Comment
  }
`;

export const resolvers = {
  Query: {
    allPosts: async (): Promise<Array<IPost>> => {
      const posts = await Post.find({})
        .populate('original_poster likers')
        .populate({
          path: 'comments',
          populate: { path: 'comment_writer likers' },
        });

      return posts;
    },
    findPost: async (
      _root: unknown,
      args: Args,
    ): Promise<IPost | null> => {
      const post = Post.findById(args.postId)
        .populate('original_poster likers')
        .populate({
          path: 'comments',
          populate: { path: 'comment_writer likers' },
        });

      return post;
    },
  },
  Mutation: {
    addPost: async (
      _root: unknown,
      args: Args,
      context: ApolloContext,
    ): Promise<IPost | null> => {
      try {
        const { currentUser } = context;
        if (!currentUser) {
          throw new Error('not authenticated');
        }

        const newPost = new Post(toNewPost(
          currentUser.id,
          args.title,
          args.description,
        ));

        const addedPost = await newPost.save();
        return addedPost;
      } catch (error) {
        console.log((error as Error).message);
        return null;
      }
    },

    likePost: async (
      _root: unknown,
      args: Args,
      context: ApolloContext,
    ): Promise<any> => {
      try {
        const { currentUser } = context;
        if (!currentUser) {
          throw new Error('not authenticated');
        }

        const post = await Post.findById(args.postId);
        if (!post || (post.likers as Array<any>).includes(currentUser.id)) {
          throw new Error('Error liking comment');
        }

        const updatedPost = await Post.findByIdAndUpdate(args.postId,
          { $addToSet: { likers: currentUser.id } }, // Add only unique id to set
          { returnOriginal: false });

        return {
          updatedPost,
        };
      } catch (error) {
        throw new Error((error as Error).message);
      }
    },

    addComment: async (
      _root: undefined,
      args: Args,
      context: ApolloContext,
    ): Promise<IComment> => {
      const { currentUser } = context;

      if (!currentUser || !currentUser.id) {
        throw new Error('not authenticated');
      }
      const post = await Post.findById(args.postId);

      if (!post) {
        throw new Error('Could not add comment');
      }

      const newComment = new Comment(toNewComment(
        currentUser.id,
        args.comment,
      ));

      const addedComment = await newComment.save();
      post.comments = post.comments.concat(addedComment.id);
      await post.save();

      return addedComment;
    },

    likeComment: async (
      _root: unknown,
      args: Args,
      context: ApolloContext,
    ): Promise<any> => {
      try {
        const { currentUser } = context;

        if (!currentUser) {
          throw new Error('not authenticated');
        }

        const comment = await Comment.findById(args.commentId);
        if (!comment || (comment.likers as Array<any>).includes(currentUser.id)) {
          throw new Error('Error liking comment');
        }

        const updatedComment = await Comment.findByIdAndUpdate(args.commentId,
          { $addToSet: { likers: currentUser.id } }, // Add only unique id to set
          { returnOriginal: false });

        return {
          updatedComment,
        };
      } catch (error) {
        console.log(error);
        throw new Error((error as Error).message);
      }
    },
  },
};
