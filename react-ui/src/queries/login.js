/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      token
      username
      id
    }
  }
`;
