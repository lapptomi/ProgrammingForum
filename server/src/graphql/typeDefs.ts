import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
