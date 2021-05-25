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
