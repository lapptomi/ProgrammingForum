/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const CREATE_NEW_COMMENT = gql`
  mutation addComment($postId: ID!, $comment: String!) {
    addComment(postId: $postId, comment: $comment) {
      id
      comment
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
