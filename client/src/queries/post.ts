import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
  query {
    allPosts  {
      id
      title
      description
      original_poster {
        id
        username
      }
      comments {
        id
        comment
      }
      likes
    }
  }
`;

export const FIND_POST_BY_ID = gql`
  query findPost($postId: ID!) {
    findPost(postId: $postId) {
      id
      original_poster {
        email
        username
      }
      title
      description
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
