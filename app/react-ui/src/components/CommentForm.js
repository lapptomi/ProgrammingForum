/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form, Button, Header, Segment,
} from 'semantic-ui-react';
import postService from '../services/postService';
import { useGlobalState } from '../state/state';

const CommentForm = ({ post }) => {
  const [state] = useGlobalState();
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    postService.addComment(post.id, comment)
      .then(() => window.location.reload())
      .catch(({ response }) => {
        if (response.data === 'jwt expired') {
          window.alert('Error: session has expired, please sign in again');
          window.localStorage.clear();
          window.location.replace('/login');
        }
      });
  };

  if (!state.isLoggedIn) {
    return <Header as='b' content='Please sign in to add comments' />;
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit} reply>
        <Form.TextArea
          id='commentField'
          style={{ minHeight: '50px' }}
          label='Add a new comment.'
          placeholder='Comment...'
          onChange={((event) => setComment(event.target.value))}
        />
        <Button
          id='addCommentButton'
          content='Add Comment'
          labelPosition='left'
          icon='edit'
          primary
          disabled={!comment}
        />
      </Form>
    </Segment>
  );
};

export default CommentForm;
