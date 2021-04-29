/* eslint-disable no-alert */
import { useState } from 'react';
import {
  Form, Segment, Grid, Header,
} from 'semantic-ui-react';
import postService from '../services/postService';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    postService.create({ title, description })
      .then(() => {
        window.alert('Post created!');
        window.location.replace('/posts');
      })
      .catch(({ response }) => {
        if (response.data === 'jwt expired') {
          window.alert('Error: session has expired, please sign in again');
          window.localStorage.clear();
          window.location.replace('/login');
        }
      });
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={16}>
          <Segment padded>
            <Form style={{ padding: '50px 15% 50px 15%' }} onSubmit={handleSubmit}>
              <Header as='h1' content='Create New Post' />
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
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreatePostForm;
