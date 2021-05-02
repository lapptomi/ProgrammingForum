/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form, Segment, Header,
} from 'semantic-ui-react';
import postService from '../services/postService';

const CommentForm = ({ post }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    postService.addComment(post.id, comment)
      .then(() => {
        window.alert('Comment added!');
        window.location.reload();
      })
      .catch(({ response }) => {
        if (response.data === 'jwt expired') {
          window.alert('Error: session has expired, please sign in again');
          window.localStorage.clear();
          window.location.replace('/login');
        }
      });
  };

  const loggedUser = window.localStorage.getItem('loggedUser');

  if (!loggedUser) {
    return <Header as='b' content='Please sign in to add comments' />;
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.TextArea
          id='commentField'
          style={{ minHeight: '50px' }}
          label='Add a new comment.'
          placeholder='Comment...'
          onChange={((event) => setComment(event.target.value))}
        />
        <Form.Button
          id='addCommentButton'
          primary
          disabled={comment.length < 2}
        >
          Create
        </Form.Button>
      </Form>
    </Segment>
  );
};

export default CommentForm;
