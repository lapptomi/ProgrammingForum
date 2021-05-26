/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
/* eslint-disable no-console */
// eslint-disable-next-line no-use-before-define
import React from 'react';
import ReactDOM from 'react-dom';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  createHttpLink,
  ApolloProvider,
  InMemoryCache,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import reducer from './state/reducer';
import { StateProvider } from './state/state';
import App from './App';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      if (message.includes('Context creation failed: jwt expired')) {
        // sign out the user if jwt is expired
        window.localStorage.clear();
        window.alert('Session expired, please sign in again');
        window.location.reload();
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const authLink = setContext(({ headers }: any) => {
  // get the authentication token from local storage if it exists
  const currentUser = localStorage.getItem('loggedUser');
  const token = currentUser
    ? JSON.parse(currentUser as string).token
    : null;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <StateProvider reducer={reducer}>
        <App />
      </StateProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);
