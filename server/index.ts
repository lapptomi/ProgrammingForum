/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable arrow-body-style */
import {
  ApolloServer, gql, UserInputError,
} from 'apollo-server-express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {
  NewPost, NewUser, Post, User,
} from './types';
import app from './src/app';
import commentRepository from './src/repository/commentRepository';
import postRepository from './src/repository/postRepository';
import userRepository from './src/repository/userRepository';
import {
  parseId, toNewComment, toNewPost, toNewUser,
} from './src/utils';

dotenv.config();

const startApolloServer = async () => {
  const typeDefs = gql`
    type User {
      id: ID!
      email: String!
      username: String!
      password: String!
      created_at: String
      updated_at: String
    }

    type Post {
      id: ID!
      original_poster_id: ID!
      title: String!
      description: String!
      likes: Int
      original_poster_username: String!
      created_at: String
      updated_at: String
    }
    
    type Token {
      id: Int!
      username: String!
      token: String!
    }
    
    type Comment {
      id: ID!
      post_id: ID!
      writer_id: ID!
      comment: String!
      likes: Int!
      created_at: String
      updated_at: String
    }
  
    type Query {
      allUsers: [User!]!
      allPosts: [Post!]!
      findPost(postId: ID!): Post!
      allComments: [Comment!]!
      findComments(postId: ID!): [Comment!]!
    }

    type Mutation {
      addPost(
        title: String!
        description: String!
      ): Post

      likePost(
        postId: ID!
      ): Post

      addUser(
        email: String!
        username: String!
        password: String!
      ): User

      addComment(
        postId: ID!
        comment: String!
      ): Comment

      likeComment(
        commentId: ID!
      ): Comment

      login(
        username: String!
        password: String!
      ): Token
    }
  `;

  const resolvers = {
    Query: {
      allUsers: () => userRepository.getAll(),
      allPosts: () => postRepository.getAll(),
      findPost: async (_root: any, args: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const postId = parseId(Number(args.postId));
        const posts = await postRepository.getAll();
        const post = posts.find((p: Post) => p.id === postId);
        return post;
      },
      allComments: () => commentRepository.getAll(),
      findComments: async (_root: any, args: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const postId = parseId(Number(args.postId));
        const postComments = await commentRepository.findByPostId(postId);
        console.log(postComments);
        return postComments;
      },
    },
    Mutation: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addPost: async (_root: any, args: NewPost, context: any) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const currentUser = context.currentUser as User;
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
        } catch (e) {
          throw new UserInputError((e as Error).message, {
            invalidArgs: args,
          });
        }
      },
      likePost: async (_root: any, args: any, context: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const postId = parseId(Number(args.postId));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const currentUser = context.currentUser as User;
        if (!currentUser) {
          throw new Error('not authenticated');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        await postRepository.addLike(postId, currentUser.id);
        const updatedLikes = await postRepository.findLikesByPostId(postId);
        return { likes: updatedLikes };
      },
      addComment: async (_root: any, args: any, context: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const currentUser = context.currentUser as User;
        if (!currentUser) {
          throw new Error('not authenticated');
        }
        const { postId, comment } = args;
        console.log(Number(postId), 'id');
        const newComment = toNewComment({
          post_id: Number(postId),
          writer_id: currentUser.id,
          comment,
        });

        const addedComment = await commentRepository.create(newComment);
        return addedComment;
      },
      likeComment: async (_root: any, args: any, context: any) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const commentId = parseId(Number(args.commentId));
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const currentUser = context.currentUser as User;
          if (!currentUser) {
            throw new Error('not authenticated');
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const updatedLikes = await commentRepository.addLike(commentId, currentUser.id);

          return { likes: updatedLikes };
        } catch (e) {
          throw new Error((e as Error).message);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      addUser: async (_root: any, args: any) => {
        try {
          const newUser = toNewUser(args as NewUser);
          const addedUser = await userRepository.create(newUser);
          return addedUser;
        } catch (e) {
          throw new UserInputError((e as Error).message, {
            invalidArgs: args,
          });
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      login: async (_root: any, args: any) => {
        const { username, password } = args as User;
        const user = await userRepository.findByUsername(username);
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!(user && passwordsMatch)) {
          throw new Error('Invalid username or password');
        }

        const userForToken = {
          id: user.id,
          username: user.username,
        };

        const newToken = jwt.sign(
          userForToken,
          process.env.SECRET as string,
          { expiresIn: 60 * 60 }, // expires in 1h
        );

        return {
          token: newToken,
          username: user.username,
          id: user.id,
        };
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line consistent-return
    context: async ({ req }): Promise<any> => {
      const authorization = req ? req.headers.authorization : null;

      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const auth: Array<string> = authorization.split(' ');
        // auth[0] should equal 'bearer'
        // and auth[1] should be the token
        const token = auth[1];

        const decodedToken = jwt.verify(
          token, process.env.SECRET as string,
        ) as User;

        if (!token || !decodedToken.id) {
          throw new Error('Token missing or invalid');
        }

        const user = await userRepository.findById(decodedToken.id);
        return { currentUser: user };
      }
    },
  });
  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};

startApolloServer().catch((err) => {
  console.error(err);
});
