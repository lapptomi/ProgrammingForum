/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Divider, Header, Grid, Icon, Container,
} from 'semantic-ui-react';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Loading from '../components/Loading';
import Post from '../components/Post';
import { FIND_POST_BY_ID } from '../queries/post';

const PostPage = () => {
  const [comments] = useState([]);

  const { id } = useParams();
  const { loading, data } = useQuery(FIND_POST_BY_ID, {
    variables: { postId: id },
  });

  if (loading) {
    return <Loading />;
  }
  if (!data) {
    return (
      <Container textAlign='center'><h1>404 - Not Found</h1></Container>
    );
  }

  const post = data.findPost;

  return (
    <div>
      <Grid>
        <Grid.Row
          color='violet'
          textAlign='center'
          style={{ padding: '100px' }}
        >
          <Grid.Column width={16} textAlign='center'>
            <Header style={{ fontSize: '48px' }} inverted>
              <Icon name='code' /> Programming Forum
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Container style={{ marginTop: '100px' }}>
        <Grid celled>
          <Post post={post} />
        </Grid>
        <Divider />
        <CommentList comments={comments} />
        <CommentForm post={post} />
      </Container>
    </div>
  );
};

export default PostPage;
