/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import { useQuery } from '@apollo/client';
import React from 'react';
import {
  Grid, Header, Container,
} from 'semantic-ui-react';
import { GET_ALL_POSTS } from '../queries/post';
import { IPost } from '../types';
import Loading from './Loading';
import Post from './Post';

const PostsList: React.FC = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return <Loading />;
  }

  const posts: Array<IPost> = data.allPosts;

  if (posts.length === 0) {
    return (
      <Container textAlign="center" style={{ paddingTop: '100px' }}>
        <Header as="h1" content="No posts added yet..." />
        <a href="/posts/create">
          <h4>Be the first  to create one here!</h4>
        </a>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '80px' }}>
      <Grid celled>
        {posts.map((post: IPost) => (
          <Post post={post} key={post.id} />
        ))}
      </Grid>
    </Container>
  );
};

export default PostsList;
