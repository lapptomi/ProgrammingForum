/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable arrow-body-style */
import {
  ApolloServer, gql,
} from 'apollo-server-express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import {
  User,
} from './types';
import app from './src/app';
import userRepository from './src/repository/userRepository';
import { postQueries, postMutations } from './src/graphql/resolvers/postResolver';
import { userMutations, userQueries } from './src/graphql/resolvers/userResolver';
import { commentMutations, commentQueries } from './src/graphql/resolvers/commentResolver';
import { loginMutations } from './src/graphql/resolvers/loginResolver';

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
      username: String!
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
      ...postQueries,
      ...userQueries,
      ...commentQueries,
    },
    Mutation: {
      ...postMutations,
      ...commentMutations,
      ...userMutations,
      ...loginMutations,
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
