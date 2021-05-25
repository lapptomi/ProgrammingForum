/* eslint-disable no-alert */
/* eslint-disable no-console */
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
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import reducer from './state/reducer';
import { StateProvider } from './state/state';

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

const authLink = setContext(({ headers }) => {
  // get the authentication token from local storage if it exists
  const currentUser = JSON.parse(localStorage.getItem('loggedUser'));
  // return the headers to the context so httpLink can read them
  console.log('call');
  return {
    headers: {
      ...headers,
      Authorization: currentUser ? `Bearer ${currentUser.token}` : '',
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
