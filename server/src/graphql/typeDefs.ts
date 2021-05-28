import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
  }

  type Post {
    id: ID!
    original_poster: User!
    title: String!
    description: String!
    likes: Int
    comments: [Comment!]!
  }

  type Token {
    id: ID!
    username: String!
    token: String!
  }

  type Comment {
    id: ID!
    comment_writer: User!
    comment: String!
    likes: Int!
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
