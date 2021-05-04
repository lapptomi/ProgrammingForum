/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Container, Divider, Header, Segment, Grid, Icon,
} from 'semantic-ui-react';
import postService from '../services/postService';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    postService.findCommentsByPostId(post.id)
      .then((result) => setComments(result))
      .catch((error) => console.log(error.message));
  }, [post.id]);

  return (
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

      <Grid.Row>
        <Container>
          <Header
            style={{ marginTop: '50px' }}
            as='h1'
            content={`Post ${post.id}`}
            subheader={`Original poster id: ${post.original_poster_id}`}
          />

          <Segment size='huge'>
            <Header as='h1' content={post.title} />
            <Divider />
            <p>{post.description}</p>
          </Segment>

          <Segment color='black'>
            <Header as='h2' content='Comments:' />
            <Divider />
            <CommentList comments={comments} />
          </Segment>

          <CommentForm post={post} />
        </Container>
      </Grid.Row>

    </Grid>
  );
};

export default Post;
