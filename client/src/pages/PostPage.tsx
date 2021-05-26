/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Divider, Header, Grid, Icon, Container,
} from 'semantic-ui-react';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Loading from '../components/Loading';
import Post from '../components/Post';
import { FIND_POST_BY_ID } from '../queries/post';
import img from '../style/header.jpg';

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, data } = useQuery(FIND_POST_BY_ID, {
    variables: { postId: id },
  });

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return (
      <Container textAlign="center"><h1>404 - Not Found</h1></Container>
    );
  }

  const post = data.findPost;

  return (
    <div>
      <Grid>
        <Grid.Row
          color="violet"
          textAlign="center"
          style={{
            padding: '100px',
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 200%',
          }}
        >
          <Grid.Column width={16} textAlign="center">
            <Header inverted style={{ fontSize: '40px' }}>
              <p>
                <Icon name="dollar sign" color="yellow" />
                <span>{post.title}</span>
                <span className="blinking">_</span>
              </p>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container style={{ marginTop: '100px' }}>
        <Grid celled>
          <Post post={post} />
        </Grid>
        <Divider />
        <CommentList />
        <CommentForm postId={post.id} />
      </Container>
    </div>
  );
};

export default PostPage;
