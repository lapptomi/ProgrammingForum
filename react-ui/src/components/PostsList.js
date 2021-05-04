/* eslint-disable arrow-body-style */
import React from 'react';
import {
  Grid, Header, Divider, Icon, Container,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../state/state';

const PostsList = () => {
  const [state] = useStateValue();

  return (
    <Container>
      <Header as='h1' content='Newest Posts' style={{ padding: '40px' }} textAlign='center' />
      <Grid celled>
        {state.posts.map((post, i) => (
          <React.Fragment key={i}>

            <Grid.Row style={{ padding: '10px' }} color='grey'>
              <Link to={`/posts/${post.id}`}>
                <Header
                  inverted
                  as='h3'
                  content={post.title}
                  subheader={`Posted by user id ${post.original_poster_id}`}
                />
              </Link>
            </Grid.Row>

            <Grid.Row key={i} divided>

              <Grid.Column width={12} floated='left'>
                <Header
                  size='small'
                  content={post.description}
                  style={{ padding: '15px', fontWeight: 'normal' }}
                />
                <Divider />
                <Header
                  as='a'
                  href={`/posts/${post.id}`}
                  size='small'
                  content='Show Comments'
                  style={{ padding: '10px' }}
                />
                <Icon name='comment' color='grey' />
              </Grid.Column>

              <Grid.Column
                width={2}
                floated='right'
                textAlign='center'
              >
                Lastest Message: 12:20
                <Divider />
                By User123
              </Grid.Column>

              <Grid.Column
                width={2}
                floated='right'
                textAlign='center'
                style={{ margin: 0, maxWidth: '70px' }}
              >
                <Icon name='arrow up' /> 0
                <Header as='h4' content='likes' />
                <Icon name='arrow down' /> 0
              </Grid.Column>

            </Grid.Row>
          </React.Fragment>
        ))}

      </Grid>
    </Container>
  );
};

export default PostsList;
