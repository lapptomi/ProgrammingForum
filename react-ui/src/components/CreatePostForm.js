/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form, Segment,
} from 'semantic-ui-react';
import postService from '../services/postService';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    postService.create({ title, description })
      .then(() => {
        window.alert('Post created!');
        setTitle('');
        setDescription('');
      })
      .catch((error) => window.alert(`Error creating post: ${error.message}`));
  };

  return (
    <Segment>
      <Form style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <h1>Create New Post</h1>
        <Form.Input
          id='title'
          fluid
          label='Title'
          placeholder='Title'
          onChange={((event) => setTitle(event.target.value))}
        />
        <Form.TextArea
          id='description'
          style={{ minHeight: '150px' }}
          label='Description'
          placeholder='Description...'
          onChange={((event) => setDescription(event.target.value))}
        />
        <Form.Button
          id='createPostButton'
          primary
          disabled={title.length < 4 || description.length < 4}
        >
          Create
        </Form.Button>
      </Form>
    </Segment>
  );
};

export default CreatePostForm;
