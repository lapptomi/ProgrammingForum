/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable arrow-body-style */
import {
  ApolloServer, gql, UserInputError,
} from 'apollo-server-express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { NewPost, User } from './types';
import app from './src/app';
import commentRepository from './src/repository/commentRepository';
import postRepository from './src/repository/postRepository';
import userRepository from './src/repository/userRepository';
import { toNewPost } from './src/utils';

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
      created_at: String
      updated_at: String
    }
  
    type Query {
      allUsers: [User!]!
      allPosts: [Post!]!
      allComments: [Comment!]!
    }

    type Mutation {
      addPost(
        title: String!
        description: String!
      ): Post
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
      allComments: () => commentRepository.getAll(),
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
        return {
          currentUser: user,
        };
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
