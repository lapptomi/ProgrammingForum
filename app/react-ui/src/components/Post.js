/* eslint-disable no-alert */
import { Link } from 'react-router-dom';
import {
  Divider,
  Grid, Header, Icon, Item,
} from 'semantic-ui-react';
import postService from '../services/postService';
import { useGlobalState } from '../state/state';

const Post = ({ post }) => {
  const [state] = useGlobalState();

  const handlePostLike = () => {
    if (!state.isLoggedIn) {
      window.alert('You must be logged in to add likes');
      return;
    }

    postService.addLike(post.id)
      .then(() => {
        window.alert('Like added!');
        window.location.reload();
      })
      .catch(({ response }) => {
        if (response.data === 'jwt expired') {
          window.alert('Error: session has expired, please sign in again');
          window.localStorage.clear();
          window.location.replace('/login');
        } else {
          window.alert(response.data);
        }
      });
  };

  return (
    <>
      <Grid.Row color='violet'>
        <Grid.Column width={14} style={{ padding: '8px' }}>
          <Link to={`/posts/${post.id}`}>
            <Header
              inverted
              as='h3'
              content={post.title}
              subheader={`
                Posted on ${post.created_at.substring(0, 10)}
                by ${post.username}
              `}
            />
          </Link>
        </Grid.Column>
        <Grid.Column width={2} textAlign='center'>
          <Item id='postLikes'>
            <Icon
              id='postLikeButton'
              link
              onClick={handlePostLike}
              name='thumbs up'
            />
            <b>{post.likes}</b>
          </Item>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16} floated='left'>
          <Header
            size='small'
            content={post.description}
            style={{
              padding: '20px 10px 20px 10px',
              fontWeight: 'normal',
            }}
          />
          <Divider />
          <Link to={`/posts/${post.id}`}>
            <Header
              as='b'
              size='small'
              content='Comments'
              style={{ padding: '10px' }}
            />
            <Icon name='comment' color='grey' />
          </Link>
        </Grid.Column>
      </Grid.Row>
    </>
  );
};

export default Post;
