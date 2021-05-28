import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Token } from './types';
import app from './src/app';
import { postQueries, postMutations } from './src/graphql/resolvers/postResolver';
import { userMutations, userQueries } from './src/graphql/resolvers/userResolver';
import { loginMutations } from './src/graphql/resolvers/loginResolver';
import { typeDefs } from './src/graphql/typeDefs';
import User from './src/models/User';

dotenv.config();

const MONGODB_URI2 = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI2 as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(() => {
  console.log('connected to MongoDB');
}).catch((error) => {
  console.log('error connecting to MongoDB:', (error as Error).message);
});

const startApolloServer = async () => {
  const resolvers = {
    Query: {
      ...postQueries,
      ...userQueries,
    },
    Mutation: {
      ...postMutations,
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

        const user = await User.findById(decodedToken.id);
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
