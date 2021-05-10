/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import {
  Divider, Header, Grid, Icon, Container,
} from 'semantic-ui-react';
import postService from '../services/postService';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

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
          <Grid.Row style={{ padding: '10px' }} color='violet'>
            <Header
              inverted
              as='h3'
              content={post.title}
              subheader={`
                Posted on ${post.posting_date.substring(0, 10)}
                by ${post.writer_username}`
              }
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14} floated='left'>
              <Header
                size='small'
                content={post.description}
                style={{ padding: '30px 10px 30px 10px', fontWeight: 'normal' }}
              />
              <Divider />
              <Icon name='reply' color='black' />
              <Header
                as='b'
                size='small'
                content={`${comments.length} replies`}
                style={{ padding: '10px' }}
              />
            </Grid.Column>
            <Grid.Column
              width={2}
              floated='right'
              textAlign='center'
              style={{ margin: 0, padding: '20px', maxWidth: '85px' }}
            >
              <Icon name='arrow up' />
              <Header as='h4' content='likes 0' />
              <Icon name='arrow down' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <CommentList comments={comments} />
        <CommentForm post={post} />
      </Container>
    </div>
  );
};

export default PostPage;
