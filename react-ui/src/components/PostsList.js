/* eslint-disable no-alert */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  Grid, Header, Divider, Icon, Container, Item,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../state/state';
import postService from '../services/postService';

const PostsList = () => {
  const [state] = useGlobalState();

  const handleAddLike = (postId) => {
    if (!state.isLoggedIn) {
      window.alert('You must be logged in to add likes');
      return;
    }
    postService.addLike(postId)
      .then(() => {
        window.alert('Like added!');
        window.location.reload();
      })
      .catch(({ response }) => window.alert(response.data));
  };

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
      <Header as='h1' content='Newest Posts' style={{ padding: '40px' }} textAlign='center' />
      <Grid celled>
        {state.posts.map((post, i) => (
          <React.Fragment key={i}>
            <Grid.Row style={{ padding: '10px' }} color='violet'>
              <Link to={`/posts/${post.id}`}>
                <Header
                  inverted
                  as='h3'
                  content={post.title}
                  subheader={`Posted on ${post.posting_date.substring(0, 10)}
                  by ${post.username}`}
                />
              </Link>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={14} floated='left'>
                <Header
                  size='small'
                  content={post.description}
                  style={{ padding: '20px 10px 20px 10px', fontWeight: 'normal' }}
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
                style={{ margin: 0, padding: '20px', maxWidth: '85px' }}
              >
                <Item.Group link>
                  <Item onClick={() => handleAddLike(post.id)}>
                    <Item.Content>
                      <Icon name='arrow up' />
                      <Header as='h4' content={`likes ${post.likes}`} />
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
          </React.Fragment>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsList;
