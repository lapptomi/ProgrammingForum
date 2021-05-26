import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    allUsers  {
      id
      username
      password
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      email
      username
      password
    }
  }
`;
