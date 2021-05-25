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

export default {
  GET_ALL_USERS,
};
