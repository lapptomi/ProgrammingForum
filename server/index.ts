/* eslint-disable arrow-body-style */
import { ApolloServer, gql } from 'apollo-server-express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from './types';
import app from './src/app';
import commentRepository from './src/repository/commentRepository';
import postRepository from './src/repository/postRepository';
import userRepository from './src/repository/userRepository';

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
      value: String!
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
      userCount: Int!
    }

    type Mutation {
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
      userCount: () => 123,
    },
    Mutation: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      login: async (_root: any, args: any) => {
        const { username, password } = args as User;
        const user = await userRepository.findByUsername(username);
        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!(user && passwordsMatch)) {
          throw new Error('Invalid username or password');
        }

        const userForToken = {
          username: user.username,
          id: user.id,
        };

        const token = jwt.sign(
          userForToken,
          process.env.SECRET as string,
          { expiresIn: 60 * 60 }, // expires in 1h
        );

        return {
          value: token,
        };
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: async ({ req }): Promise<any> => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.SECRET as string,
        ) as User;

        const user = await userRepository
          .findByUsername(decodedToken.username);

        return {
          currentUser: user,
        };
      }
      return null;
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
