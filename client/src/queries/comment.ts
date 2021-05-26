/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const FIND_COMMENTS_BY_POST_ID = gql`
  query findComments($postId: ID!) {
    findComments(postId: $postId) {
      id
      post_id
      writer_id
      comment
      username
      likes
      created_at
      updated_at
    }
  }
`;

export const CREATE_NEW_COMMENT = gql`
  mutation addComment($postId: ID!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      id
      post_id
      writer_id
      comment
      created_at
      updated_at
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($commentId: ID!) {
    likeComment(commentId: $commentId) {
      likes
    }
  }
`;
