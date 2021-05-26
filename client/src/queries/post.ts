import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query {
    allPosts  {
      id
      original_poster_id
      title
      description
      created_at
      updated_at
      original_poster_username
      likes
    }
  }
`;

export const FIND_POST_BY_ID = gql`
  query findPost($postId: ID!) {
    findPost(postId: $postId) {
      id
      original_poster_id
      title
      description
      created_at
      updated_at
      original_poster_username
      likes
    }
  }
`;

export const CREATE_NEW_POST = gql`
  mutation addPost($title: String!, $description: String!) {
    addPost(
      title: $title,
      description: $description
    ) {
      title
      description
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      likes
    }
  }
`;
