/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form, Segment,
} from 'semantic-ui-react';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (title && content) {
      window.alert(`Title: ${title} Content: ${content}`);
    } else {
      window.alert('Title and content cannot be empty');
    }
  };

  return (
    <Segment>
      <Form style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <h1>Create New Post</h1>
        <Form.Input
          fluid
          label='Title'
          placeholder='Title'
          onChange={((event) => setTitle(event.target.value))}
        />
        <Form.TextArea
          label='Content'
          placeholder='Content...'
          onChange={((event) => setContent(event.target.value))}
        />
        <Form.Button>Create</Form.Button>
      </Form>
    </Segment>
  );
};

export default CreatePostForm;
