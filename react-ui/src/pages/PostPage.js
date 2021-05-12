/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Divider, Header, Grid, Icon, Container,
} from 'semantic-ui-react';
import postService from '../services/postService';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import Post from '../components/Post';

const PostPage = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    postService.findCommentsByPostId(post.id)
      .then((result) => setComments(result))
      .catch((error) => console.log(error.message));
  }, [post.id]);

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
