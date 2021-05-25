/* eslint-disable no-alert */
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  Form, Button, Header, Segment,
} from 'semantic-ui-react';
import { CREATE_NEW_COMMENT } from '../queries/comment';
import { useGlobalState } from '../state/state';

const CommentForm = ({ post }) => {
  const [state] = useGlobalState();
  const [comment, setComment] = useState('');

  const [createNewComment] = useMutation(CREATE_NEW_COMMENT);

  const handleSubmit = () => {
    createNewComment({ variables: { postId: post.id, comment } })
      .then(() => {
        setComment('');
        window.location.reload();
      })
      .catch((error) => {
        window.alert(error);
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
