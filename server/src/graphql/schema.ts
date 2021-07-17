import { makeExecutableSchema } from 'apollo-server-express';
import { merge } from 'lodash';
import {
  typeDefs as UserDef,
  resolvers as userResolvers,
} from './user';
import {
  typeDefs as PostDef,
  resolvers as postResolvers,
} from './post';
import {
  typeDefs as LoginDef,
  resolvers as loginResolvers,
} from './login';

// If you had Query / Mutation / Subscription fields not associated with a
// specific type you could put them here
const Query = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, UserDef, PostDef, LoginDef],
  resolvers: merge(resolvers, userResolvers, postResolvers, loginResolvers),
});
