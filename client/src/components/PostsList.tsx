/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import { useQuery } from '@apollo/client';
import React from 'react';
import {
  Header, Container, Message,
} from 'semantic-ui-react';
import { GET_ALL_POSTS } from '../queries/post';
import { IPost } from '../types';
import Loading from './Loading';
import Post from './Post';

const PostsList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Message>
        <Container textAlign="center">
          <b>Error</b>
          <p>{`${error.message}`}</p>
        </Container>
      </Message>
    );
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
      {posts.map((post: IPost) => (
        <Post post={post} key={post.id} />
      ))}
    </Container>
  );
};

export default PostsList;
