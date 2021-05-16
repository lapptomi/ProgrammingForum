/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  Grid, Header, Container, Icon, Item,
} from 'semantic-ui-react';
import { useGlobalState } from '../state/state';
import Post from './Post';

const PostsList = () => {
  const [state] = useGlobalState();

  const urlParams = new URLSearchParams(window.location.search);

  const sortByParam = urlParams.get('sort');
  // eslint-disable-next-line no-console
  console.log('sort = ', sortByParam);

  if (state.posts.length === 0) {
    return (
      <Container textAlign='center' style={{ paddingTop: '100px' }}>
        <Header as='h1' content='No posts added yet...' />
        <a href='/posts/create'><h4>Be the first  to create one here!</h4></a>
      </Container>
    );
  }

  return (
    <Container>
      <Item>
        <Header
          as='h1'
          style={{ paddingTop: '100px' }}
          textAlign='left'
        >
          <Icon color='black' name='list' /> Posts
        </Header>
      </Item>
      <Grid celled>
        {state.posts.map((post, i) => (
          <Post post={post} key={i} />
        ))}
      </Grid>
    </Container>
  );
};

export default PostsList;
