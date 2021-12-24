import { gql } from '@apollo/client';

const BASIC_POST_INFO = gql`
  fragment BasicPostInfo on Post {
    id
    title
    created_at
    description
    likers {
      id
      username
      email
    }
    original_poster {
      id
      username
    }
  }
`;

export const GET_ALL_POSTS = gql`
  ${BASIC_POST_INFO}
  query {
    allPosts  {
      ...BasicPostInfo
    }
  }
`;

export const FIND_POST_BY_ID = gql`
  ${BASIC_POST_INFO}
  query findPost($postId: ID!) {
    findPost(postId: $postId) {
      ...BasicPostInfo
      comments {
        id
        comment
        created_at
        likers {
          id
          username
          email
        }
        comment_writer {
          id
          username
        }
      } 
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
      likers {
        id
        username
        email
      }
    }
  }
`;
