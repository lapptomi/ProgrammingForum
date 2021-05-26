import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { Token } from './types';
import app from './src/app';
import userRepository from './src/repository/userRepository';
import { postQueries, postMutations } from './src/graphql/resolvers/postResolver';
import { userMutations, userQueries } from './src/graphql/resolvers/userResolver';
import { commentMutations, commentQueries } from './src/graphql/resolvers/commentResolver';
import { loginMutations } from './src/graphql/resolvers/loginResolver';
import { typeDefs } from './src/graphql/typeDefs';

dotenv.config();

const startApolloServer = async () => {
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
      const authorization = req
        ? req.headers.authorization
        : null;

      if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const auth: Array<string> = authorization.split(' ');
        // auth[0] should equal 'bearer'
        // and auth[1] should be the token
        const token = auth[1];

        const decodedToken = jwt.verify(
          token, process.env.SECRET as string,
        ) as Token;

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
