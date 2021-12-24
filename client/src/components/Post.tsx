/* eslint-disable no-alert */
import { useMutation } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  Grid, Header, Icon, Item,
} from 'semantic-ui-react';
import { LIKE_POST } from '../queries/post';
import { useGlobalState } from '../state/state';
import { IPost } from '../types';

interface Props {
  post: IPost;
}

const Post: React.FC<Props> = ({ post }) => {
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
    <Grid celled style={{ marginTop: '50px' }}>
      <Grid.Row color="black">
        <Grid.Column width={14} style={{ padding: '8px' }}>
          <Link to={`/posts/${post.id}`}>
            <Header
              inverted
              as="h3"
              content={post.title}
              subheader={`
                Posted on ${post.created_at}
                by ${post.original_poster.username}
              `}
            />
          </Link>
        </Grid.Column>
        <Grid.Column width={2} textAlign="center">
          <Item id="postLikes">
            <Icon
              id="postLikeButton"
              link
              onClick={handlePostLike}
              name="thumbs up"
            />
            <b>{post.likers.length}</b>
          </Item>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16} floated="left">
          <Header
            size="small"
            content={post.description}
            style={{
              padding: '20px 10px 20px 10px',
              fontWeight: 'normal',
            }}
          />
          <Divider />
          <Link to={`/posts/${post.id}`}>
            <Header
              as="b"
              size="small"
              content="Comments"
              style={{ padding: '10px' }}
            />
            <Icon name="comment" color="grey" />
          </Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Post;
