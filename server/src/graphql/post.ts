import { gql } from 'apollo-server-express';
import { ApolloContext } from '../../types';
import Comment, { ICommentSchema } from '../models/Comment';
import Post, { IPostSchema } from '../models/Post';
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
    title: String!
    description: String!
    likers: [User!]
    likeCount: Int
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    comment_writer: User!
    comment: String!
    likers: [User!]
    likeCount: Int
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
    allPosts: async (): Promise<Array<IPostSchema>> => {
      const posts = await Post.find({})
        .populate('original_poster')
        .populate({
          path: 'comments',
          populate: {
            path: 'comment_writer',
          },
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'likers',
          },
        });

      return posts;
    },
    findPost: async (
      _root: unknown,
      args: Args,
    ): Promise<IPostSchema | null> => {
      const post = Post.findById(args.postId)
        .populate('original_poster')
        .populate({
          path: 'comments',
          populate: {
            path: 'likers',
          },
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'comment_writer',
          },
        });
      return post;
    },
  },
  Mutation: {
    addPost: async (
      _root: unknown,
      args: Args,
      context: ApolloContext,
    ): Promise<IPostSchema | null> => {
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

        const updatedPost = await Post.findByIdAndUpdate(args.postId, {
          $inc: { likeCount: 1 }, // Increment likeCount by one
          $addToSet: { likers: currentUser.id }, // Add only unique id to set
        });

        return {
          likeCount: updatedPost?.likeCount,
        };
      } catch (error) {
        throw new Error(error);
      }
    },

    addComment: async (
      _root: undefined,
      args: Args,
      context: ApolloContext,
    ): Promise<ICommentSchema> => {
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

        const updatedComment = await Comment.findByIdAndUpdate(args.commentId, {
          $inc: { likeCount: 1 }, // Increment likeCount by one
          $addToSet: { likers: currentUser.id }, // Add only unique id to set
        });

        return {
          likeCount: updatedComment?.likeCount,
        };
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
};
