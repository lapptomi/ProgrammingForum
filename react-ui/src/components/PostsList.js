/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  Grid, Header, Container,
} from 'semantic-ui-react';
import { useGlobalState } from '../state/state';
import Post from './Post';

const PostsList = () => {
  const [state] = useGlobalState();

  if (state.posts.length === 0) {
    return (
      <Container textAlign='center' style={{ paddingTop: '100px' }}>
        <Header as='h1' content='No posts added yet...' />
        <a href='/posts/create'><h4>Be the first  to create one here!</h4></a>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '80px' }}>
      <Grid celled>
        {state.posts.map((post, i) => (
          <Post post={post} key={i} />
        ))}
      </Grid>
    </Container>
  );
};

export default PostsList;
