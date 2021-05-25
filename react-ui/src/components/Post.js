/* eslint-disable no-alert */
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import {
  Divider,
  Grid, Header, Icon, Item,
} from 'semantic-ui-react';
import { LIKE_POST } from '../queries/post';
import { useGlobalState } from '../state/state';

const Post = ({ post }) => {
  const [state] = useGlobalState();

  const [likePost] = useMutation(LIKE_POST);

  const handlePostLike = () => {
    if (!state.isLoggedIn) {
      window.alert('You must be logged in to add likes');
      return;
    }
    likePost({ variables: { postId: post.id } })
      .then(() => window.location.reload())
      .catch((error) => window.alert(error.message));
  };

  return (
    <>
      <Grid.Row color='grey'>
        <Grid.Column width={14} style={{ padding: '8px' }}>
          <Link to={`/posts/${post.id}`}>
            <Header
              inverted
              as='h3'
              content={post.title}
              subheader={`
                Posted on ${post.created_at}
                by ${post.original_poster_username}
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
