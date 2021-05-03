/* eslint-disable arrow-body-style */
import {
  Grid, Segment, Header, Divider, Icon, Container,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <Grid celled padded style={{ padding: '20px 50px 0px 50px' }}>
        <Header as='h1' content='Posts: ' />
        {posts.map((post, i) => (
          <Grid.Row key={i} style={{ padding: '10px' }}>
            <Grid.Column width={16}>
              <Segment>
                <Link to={`/posts/${post.id}`}>
                  <Header as='h2' content={post.title} />
                  <Divider />
                  <Header as='b' subheader={post.description} />
                </Link>
                <Divider />
                <a href={`/posts/${post.id}`}>
                  <b>Show Comments <Icon name='comment' color='grey' /></b>
                </a>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsList;
